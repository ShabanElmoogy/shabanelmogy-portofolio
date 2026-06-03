import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL as API_BASE } from "@/config";
import http from "@/api/httpClient";

const API_URL = `${API_BASE}/projects`;

const useProjectDetail = (id) => {
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProject = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await http.get(`${API_URL.replace(API_BASE, "")}/${id}`);
      setProject(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const goBack = () => {
    window.scrollTo(0, 0);
    navigate(-1);
  };

  const goHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  const isVideoUrl = (url) => {
    if (!url) return false;
    const videoPatterns = [
      /youtube\.com\/watch\?v=/,
      /youtube\.com\/embed\//,
      /youtu\.be\//,
      /vimeo\.com\//,
      /dailymotion\.com\//,
      /twitch\.tv\//,
      /\.mp4$/,
      /\.webm$/,
      /\.ogg$/
    ];
    return videoPatterns.some((pattern) => pattern.test(url));
  };

  const getEmbedUrl = (url) => {
    if (!url) return url;
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  const mediaItems = (() => {
    if (!project) return [];
    const items = [];

    if (project.imgPath) {
      items.push({
        type: isVideoUrl(project.imgPath) ? "video" : "image",
        url: project.imgPath,
        embedUrl: getEmbedUrl(project.imgPath),
        alt: project.title,
        title: "Main Media",
      });
    }

    if (project.images && project.images.length > 0) {
      project.images.forEach((image, index) => {
        items.push({
          type: isVideoUrl(image.imageUrl) ? "video" : "image",
          url: image.imageUrl,
          embedUrl: getEmbedUrl(image.imageUrl),
          alt: image.altText || `Gallery item ${index + 1}`,
          title: image.altText || `Gallery item ${index + 1}`,
        });
      });
    }

    return items;
  })();

  return {
    project,
    loading,
    error,
    mediaItems,
    fetchProject,
    goBack,
    goHome,
  };
};

export default useProjectDetail;
