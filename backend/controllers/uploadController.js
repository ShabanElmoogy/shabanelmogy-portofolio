import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = process.env.UPLOAD_DIR
  ? process.env.UPLOAD_DIR
  : path.resolve(__dirname, "../uploads");
fs.mkdirSync(uploadDir, { recursive: true });

// Sanitize filename to avoid unsafe characters
const sanitizeFilename = (name) => {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, "_") // keep safe characters
    .replace(/_+/g, "_");
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const original = file.originalname || "image";
    const ext = path.extname(original) || "";
    const base = path.basename(original, ext);
    const safeBase = sanitizeFilename(base).slice(0, 80) || "image";
    cb(null, `${timestamp}-${safeBase}${ext.toLowerCase()}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype || !file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 20,
  },
});

// Build a public URL path for the uploaded file
const publicUploadsBase = process.env.UPLOAD_DIR ? '/uploads' : '/uploads';

const fileToResponse = (file) => ({
  url: `${publicUploadsBase}/${file.filename}`,
  filename: file.filename,
  originalName: file.originalname,
  size: file.size,
  mimetype: file.mimetype,
});

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }
    return res.status(201).json(fileToResponse(req.file));
  } catch (err) {
    return res.status(400).json({ error: err.message || "Upload failed" });
  }
};

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No image files uploaded" });
    }
    const list = req.files.map(fileToResponse);
    return res.status(201).json({ images: list });
  } catch (err) {
    return res.status(400).json({ error: err.message || "Upload failed" });
  }
};

export const deleteUpload = async (req, res) => {
  try {
    const requested = req.params.filename;
    if (!requested) {
      return res.status(400).json({ error: "Filename is required" });
    }
    // Prevent path traversal
    const safe = path.basename(requested);
    const filePath = path.join(uploadDir, safe);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }
    fs.unlinkSync(filePath);
    return res.status(204).end();
  } catch (err) {
    return res.status(400).json({ error: err.message || "Delete failed" });
  }
};
