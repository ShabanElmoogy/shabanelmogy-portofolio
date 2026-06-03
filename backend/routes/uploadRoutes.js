import express from "express";
import { upload, uploadImage, uploadImages, deleteUpload } from "../controllers/uploadController.js";

const router = express.Router();

// POST /api/uploads/image - single image
router.post("/image", upload.single("image"), uploadImage);

// POST /api/uploads/images - multiple images (field name: images)
router.post("/images", upload.array("images", 20), uploadImages);

// DELETE /api/uploads/:filename - delete previously uploaded file by filename
router.delete("/:filename", deleteUpload);

export default router;
