// @ts-nocheck
import { useEffect, useState } from 'react';
import { API_URL as API_BASE } from '@/config';
import http from '@/api/httpClient'

const API_URL = `${API_BASE}/projects`;
const CATEGORIES_URL = `${API_BASE}/categories`;
const BUSINESS_TYPES_URL = `${API_BASE}/business-types`;
const TECHNOLOGIES_URL = `${API_BASE}/technologies`;
const UPLOADS_URL = `${API_BASE}/uploads`;

export default function useProjectDialog({ open, project, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    businessTypeId: '',
    categoryId: '',
    imgPath: '',
    images: [],
    githubUrl: '',
    previewUrl: '',
    featured: false,
    technologyIds: [],
    descriptions: [
      {
        category: 'Overview',
        title: 'Project Overview',
        points: [''],
        order: 0,
      },
    ],
  });

  const [categories, setCategories] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryError, setCategoryError] = useState('');

  useEffect(() => {
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        businessTypeId: project.businessType?.id || '',
        categoryId: project.category?.id || '',
        imgPath: project.imgPath || '',
        images: project.images || [],
        githubUrl: project.githubUrl || '',
        previewUrl: project.previewUrl || '',
        featured: project.featured || false,
        technologyIds: project.technologies?.map((tech) => tech.id) || [],
        descriptions:
          project.descriptions && project.descriptions.length > 0
            ? project.descriptions.map((desc) => ({
                category: desc.category || 'Overview',
                title: desc.title,
                points: desc.points,
                order: desc.order,
              }))
            : [
                {
                  category: 'Overview',
                  title: 'Project Overview',
                  points: [''],
                  order: 0,
                },
              ],
      });
    } else {
      setFormData({
        title: '',
        businessTypeId: '',
        categoryId: '',
        imgPath: '',
        images: [],
        githubUrl: '',
        previewUrl: '',
        featured: false,
        technologyIds: [],
        descriptions: [
          {
            category: 'Overview',
            title: 'Project Overview',
            points: [''],
            order: 0,
          },
        ],
      });
    }
    setErrors({});
    setActiveTab(0);
  }, [project, open]);

  const fetchDropdownData = async () => {
    try {
      const [categoriesData, businessTypesData, technologiesData] = await Promise.all([
        http.get(CATEGORIES_URL.replace(API_BASE, "")),
        http.get(BUSINESS_TYPES_URL.replace(API_BASE, "")),
        http.get(TECHNOLOGIES_URL.replace(API_BASE, "")),
      ]);

      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setBusinessTypes(Array.isArray(businessTypesData) ? businessTypesData : []);
      setTechnologies(Array.isArray(technologiesData) ? technologiesData : []);
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleDescriptionChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      descriptions: prev.descriptions.map((desc, i) => (i === index ? { ...desc, [field]: value } : desc)),
    }));
  };

  const handlePointChange = (descIndex, pointIndex, value) => {
    setFormData((prev) => ({
      ...prev,
      descriptions: prev.descriptions.map((desc, i) =>
        i === descIndex ? { ...desc, points: desc.points.map((p, j) => (j === pointIndex ? value : p)) } : desc
      ),
    }));
  };

  const addPoint = (descIndex) => {
    setFormData((prev) => ({
      ...prev,
      descriptions: prev.descriptions.map((desc, i) => (i === descIndex ? { ...desc, points: [...desc.points, ''] } : desc)),
    }));
  };

  const removePoint = (descIndex, pointIndex) => {
    setFormData((prev) => ({
      ...prev,
      descriptions: prev.descriptions.map((desc, i) =>
        i === descIndex ? { ...desc, points: desc.points.filter((_, j) => j !== pointIndex) } : desc
      ),
    }));
  };

  const addImage = () => setFormData((prev) => ({ ...prev, images: [...prev.images, { imageUrl: '', altText: '' }] }));
  const removeImage = (index) => setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  const handleImageChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? { ...img, [field]: value } : img)),
    }));
    if (errors[`image_${index}_${field}`]) setErrors((prev) => ({ ...prev, [`image_${index}_${field}`]: null }));
  };

  const handleMainImageFile = async (file) => {
    try {
      setUploadingMain(true);
      const form = new FormData();
      form.append('image', file);
      const data = await http.postForm(`${UPLOADS_URL.replace(API_BASE, "")}/image`, form);
      handleInputChange('imgPath', data.url);
    } catch (e) {
      console.error('Main image upload failed:', e);
      setErrors((prev) => ({ ...prev, imgPath: e.message }));
    } finally {
      setUploadingMain(false);
    }
  };

  const handleGalleryImageFile = async (index, file) => {
    try {
      setUploadingIndex(index);
      const form = new FormData();
      form.append('image', file);
      const data = await http.postForm(`${UPLOADS_URL.replace(API_BASE, "")}/image`, form);
      handleImageChange(index, 'imageUrl', data.url);
    } catch (e) {
      console.error('Gallery image upload failed:', e);
      setErrors((prev) => ({ ...prev, [`image_${index}_imageUrl`]: e.message }));
    } finally {
      setUploadingIndex(null);
    }
  };

  const addNewCategory = () => {
    const name = (newCategoryName || '').trim();
    if (!name) {
      setCategoryError('Category name is required');
      return;
    }
    const used = getUsedCategories();
    if (used.includes(name)) {
      setCategoryError('Category already exists');
      return;
    }
    setCategoryError('');
    setNewCategoryName('');
    addDescriptionSection(name);
    setActiveTab(used.length);
  };

  const addDescriptionSection = (category) => {
    setFormData((prev) => ({
      ...prev,
      descriptions: [
        ...prev.descriptions,
        { category, title: '', points: [''], order: prev.descriptions.filter((d) => d.category === category).length },
      ],
    }));
  };

  const removeDescriptionSection = (index) => {
    const categoryDescriptions = getDescriptionsByCategory(formData.descriptions[index].category);
    if (categoryDescriptions.length > 1) {
      setFormData((prev) => ({ ...prev, descriptions: prev.descriptions.filter((_, i) => i !== index) }));
    }
  };

  const getDescriptionsByCategory = (category) => formData.descriptions.filter((desc) => desc.category === category);
  const getUsedCategories = () => [...new Set(formData.descriptions.map((desc) => desc.category))].filter(Boolean);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title || !formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.imgPath || !formData.imgPath.trim()) newErrors.imgPath = 'Main image URL is required';
    if (!formData.githubUrl || !formData.githubUrl.trim()) newErrors.githubUrl = 'GitHub URL is required';
    if (!formData.previewUrl || !formData.previewUrl.trim()) newErrors.previewUrl = 'Preview URL is required';

    const validDescriptions = formData.descriptions.filter((desc) => {
      const hasTitle = desc.title && desc.title.trim();
      const hasValidPoints = desc.points && desc.points.some((point) => point && point.trim());
      return hasTitle && hasValidPoints;
    });
    if (validDescriptions.length === 0)
      newErrors.descriptions =
        'At least one complete description section is required (with title and bullet points)';

    if (Array.isArray(formData.images)) {
      formData.images.forEach((img, idx) => {
        const url = (img?.imageUrl || '').trim();
        const alt = (img?.altText || '').trim();
        if (!url && (alt || img)) newErrors[`image_${idx}_imageUrl`] = 'Image URL is required for gallery images';
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    try {
      if (!validateForm()) return;
      setLoading(true);

      const cleanedDescriptions = formData.descriptions
        .map((desc) => {
          const validPoints = desc.points ? desc.points.filter((p) => p && p.trim()) : [];
          if (validPoints.length === 0)
            validPoints.push('Key feature or detail about this project');
          return {
            category: desc.category || 'Overview',
            title: desc.title || 'Project Details',
            points: validPoints,
            order: desc.order || 0,
          };
        })
        .filter((desc) => desc.title && desc.title.trim());

      if (cleanedDescriptions.length === 0) {
        cleanedDescriptions.push({
          category: 'Overview',
          title: 'Project Overview',
          points: ['This is an innovative project showcasing modern development practices'],
          order: 0,
        });
      }

      const cleanedImages = (formData.images || [])
        .filter((img) => img && img.imageUrl && img.imageUrl.trim())
        .map((img, idx) => ({
          imageUrl: img.imageUrl.trim(),
          altText: (img.altText || '').trim(),
          order: typeof img.order === 'number' ? img.order : idx,
        }));

      const payload = {
        ...formData,
        descriptions: cleanedDescriptions,
        images: cleanedImages,
        businessTypeId: formData.businessTypeId || null,
        categoryId: formData.categoryId || null,
      };

      const url = project ? `${API_URL}/${project.id}` : API_URL;
      const savedProject = project
        ? await http.put(url.replace(API_BASE, ""), payload)
        : await http.post(url.replace(API_BASE, ""), payload);
      try {
        onSave(savedProject);
      } catch (onSaveError) {
        setErrors({ submit: 'Error updating project list: ' + onSaveError.message });
        return;
      }
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const usedCategories = getUsedCategories();
  const currentCategory = usedCategories[activeTab] || 'Overview';
  const currentCategoryDescriptions = getDescriptionsByCategory(currentCategory);

  return {
    // state
    formData,
    setFormData,
    categories,
    businessTypes,
    technologies,
    loading,
    errors,
    setErrors,
    activeTab,
    setActiveTab,
    uploadingMain,
    uploadingIndex,
    newCategoryName,
    setNewCategoryName,
    categoryError,
    setCategoryError,
    // derived
    usedCategories,
    currentCategory,
    currentCategoryDescriptions,
    // handlers
    handleInputChange,
    handleDescriptionChange,
    handlePointChange,
    addPoint,
    removePoint,
    addImage,
    removeImage,
    handleImageChange,
    handleMainImageFile,
    handleGalleryImageFile,
    addNewCategory,
    addDescriptionSection,
    removeDescriptionSection,
    validateForm,
    handleSave,
  };
}
