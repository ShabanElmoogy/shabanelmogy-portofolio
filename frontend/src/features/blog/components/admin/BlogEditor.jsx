import { useState, useEffect } from 'react';
import { 
  Box, Button, TextField, Typography, Select, MenuItem, 
  FormControl, InputLabel, Switch, FormControlLabel, 
  Grid, Divider, IconButton, Paper, Tabs, Tab,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAdminBlogs } from '../../hooks/useAdminBlogs';
import { fetchBlogCategories, fetchBlogTags, generateBlogContent } from '../../api/blogAdminApi';
import { useQuery } from '@tanstack/react-query';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const BlogEditor = ({ blog, onClose }) => {
  const isEditing = !!blog;
  const { createMutation, updateMutation } = useAdminBlogs({});

  const [tab, setTab] = useState(0); // 0 = edit, 1 = preview
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    status: 'DRAFT',
    isFeatured: false,
    categoryId: '',
    tags: [],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    scheduledPublishAt: '',
  });

  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Fetch categories and tags
  const { data: categories = [] } = useQuery({
    queryKey: ['blogCategories'],
    queryFn: fetchBlogCategories
  });

  const { data: tags = [] } = useQuery({
    queryKey: ['blogTags'],
    queryFn: fetchBlogTags
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        coverImage: blog.coverImage || '',
        status: blog.status || 'DRAFT',
        isFeatured: blog.isFeatured || false,
        categoryId: blog.categoryId || '',
        tags: blog.tags ? blog.tags.map(t => t.tagId) : [],
        seoTitle: blog.seoTitle || '',
        seoDescription: blog.seoDescription || '',
        seoKeywords: blog.seoKeywords || '',
        scheduledPublishAt: blog.scheduledPublishAt 
          ? new Date(blog.scheduledPublishAt).toISOString().slice(0, 16) 
          : '',
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagsChange = (e) => {
    setFormData(prev => ({ ...prev, tags: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format data
    const payload = {
      ...formData,
      scheduledPublishAt: formData.scheduledPublishAt ? new Date(formData.scheduledPublishAt).toISOString() : null,
      coverImage: formData.coverImage || null,
      seoTitle: formData.seoTitle || null,
      seoDescription: formData.seoDescription || null,
      seoKeywords: formData.seoKeywords || null,
    };

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: blog.id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onClose();
    } catch (err) {
      console.error('Failed to save blog:', err);
      alert('Failed to save blog. See console for details.');
    }
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiGenerating(true);
    try {
      const result = await generateBlogContent(aiPrompt);
      setFormData(prev => ({
        ...prev,
        title: result.title || prev.title,
        excerpt: result.excerpt || prev.excerpt,
        content: result.content || prev.content,
      }));
      setAiDialogOpen(false);
      setAiPrompt('');
    } catch (err) {
      console.error('AI Generation Error:', err);
      alert('Failed to generate content. Please ensure GEMINI_API_KEY is configured in the backend.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">{isEditing ? 'Edit Blog' : 'Create New Blog'}</Typography>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3, bgcolor: 'background.default' }}>
        <Paper sx={{ p: 4, maxWidth: 1200, mx: 'auto', elevation: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* LEFT COLUMN: Main Content */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>Core Content</Typography>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    startIcon={<AutoAwesomeIcon />}
                    onClick={() => setAiDialogOpen(true)}
                  >
                    Generate with AI
                  </Button>
                </Box>
                
                <TextField
                  fullWidth label="Title" name="title"
                  value={formData.title} onChange={handleChange}
                  required sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth label="Excerpt" name="excerpt"
                  value={formData.excerpt} onChange={handleChange}
                  multiline rows={2} required sx={{ mb: 3 }}
                  helperText="A brief summary for the blog card."
                />

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                    <Tab label="Write (Markdown)" />
                    <Tab label="Preview" />
                  </Tabs>
                </Box>

                {tab === 0 ? (
                  <TextField
                    fullWidth label="Content (Markdown)" name="content"
                    value={formData.content} onChange={handleChange}
                    multiline rows={15} required
                    sx={{ fontFamily: 'monospace' }}
                  />
                ) : (
                  <Box sx={{ 
                    border: '1px solid', borderColor: 'divider', p: 3, borderRadius: 1, minHeight: 400,
                    '& img': { maxWidth: '100%', height: 'auto' }
                  }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {formData.content || '*No content to preview yet.*'}
                    </ReactMarkdown>
                  </Box>
                )}

                <Divider sx={{ my: 4 }} />
                
                <Typography variant="h6" gutterBottom>SEO & Metadata</Typography>
                
                <TextField
                  fullWidth label="SEO Title" name="seoTitle"
                  value={formData.seoTitle} onChange={handleChange}
                  sx={{ mb: 3 }} placeholder="Optional overrides title for SEO"
                />

                <TextField
                  fullWidth label="SEO Description" name="seoDescription"
                  value={formData.seoDescription} onChange={handleChange}
                  multiline rows={2} sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth label="SEO Keywords" name="seoKeywords"
                  value={formData.seoKeywords} onChange={handleChange}
                  placeholder="Comma separated: react, javascript, tutorial"
                />
              </Grid>

              {/* RIGHT COLUMN: Settings */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="h6" gutterBottom>Publish Settings</Typography>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Status</InputLabel>
                  <Select name="status" value={formData.status} onChange={handleChange} label="Status">
                    <MenuItem value="DRAFT">Draft</MenuItem>
                    <MenuItem value="REVIEW">Review</MenuItem>
                    <MenuItem value="PUBLISHED">Published</MenuItem>
                    <MenuItem value="ARCHIVED">Archived</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Category</InputLabel>
                  <Select name="categoryId" value={formData.categoryId} onChange={handleChange} label="Category" required>
                    {categories.map(c => (
                      <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Tags</InputLabel>
                  <Select 
                    multiple name="tags" 
                    value={formData.tags} onChange={handleTagsChange} 
                    label="Tags"
                  >
                    {tags.map(t => (
                      <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth label="Scheduled Publish At" name="scheduledPublishAt"
                  type="datetime-local" InputLabelProps={{ shrink: true }}
                  value={formData.scheduledPublishAt} onChange={handleChange}
                  sx={{ mb: 3 }} helperText="Leave empty to publish immediately upon status=PUBLISHED"
                />

                <TextField
                  fullWidth label="Cover Image URL" name="coverImage"
                  value={formData.coverImage} onChange={handleChange}
                  sx={{ mb: 3 }}
                />
                
                {formData.coverImage && (
                  <Box component="img" src={formData.coverImage} sx={{ width: '100%', mb: 3, borderRadius: 1 }} />
                )}

                <FormControlLabel
                  control={<Switch checked={formData.isFeatured} onChange={handleChange} name="isFeatured" />}
                  label="Featured Blog"
                  sx={{ mb: 4 }}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2, borderTop: 1, borderColor: 'divider', pt: 3 }}>
              <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Blog'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>

      {/* AI Generate Dialog */}
      <Dialog open={aiDialogOpen} onClose={() => setAiDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesomeIcon color="secondary" /> Generate Blog Post
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, mt: 1 }}>
            Describe the topic you want to write about. The AI will generate a title, excerpt, and full markdown body.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="What should the blog be about?"
            placeholder="e.g. A comprehensive guide on React Hooks vs Redux for state management..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            disabled={isAiGenerating}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setAiDialogOpen(false)} disabled={isAiGenerating}>Cancel</Button>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={handleAIGenerate} 
            disabled={isAiGenerating || !aiPrompt.trim()}
          >
            {isAiGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BlogEditor;
