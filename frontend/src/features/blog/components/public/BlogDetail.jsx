import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Container, CircularProgress, Chip, Divider, Avatar } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useBlogDetail } from '../../hooks/usePublicBlogs';
import NewsletterSubscribe from './NewsletterSubscribe';
import Header from '@/components/layout/Header/Header';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const { data: blog, isLoading, isError, error } = useBlogDetail(slug);

  useEffect(() => {
    // Handle 301 redirects returned from API
    if (blog?.redirect) {
      navigate(`/blog/${blog.newSlug}`, { replace: true });
    }
  }, [blog, navigate]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !blog) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          {error?.message === 'Blog not found' ? 'Article Not Found' : 'Something went wrong'}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, cursor: 'pointer', color: 'primary.main' }} onClick={() => navigate('/blog')}>
          &larr; Back to all articles
        </Typography>
      </Container>
    );
  }

  // Generate SEO Meta tags
  const seoTitle = blog.seoTitle || `${blog.title} | Blog`;
  const seoDesc = blog.seoDescription || blog.excerpt;
  const canonicalUrl = `${window.location.origin}/blog/${blog.slug}`;

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 2,
        mt: "10px",
        mb: "10px",
        border: "2px solid",
        borderColor: (theme) => theme.palette.mode === "dark" ? "rgba(63, 63, 70, 0.4)" : "rgba(202, 202, 202, 0.518)",
        bgcolor: (theme) => theme.palette.mode === "dark" ? "rgb(24, 24, 27)" : "#ffffff",
        width: { xs: "100%", sm: "90%", md: "85%" },
        minHeight: "calc(100vh - 10px)",
        display: 'flex',
        flexDirection: 'column',
        mx: "auto",
        px: { xs: 3, md: 6, lg: 10 },
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Header />
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        {blog.seoKeywords && <meta name="keywords" content={blog.seoKeywords} />}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        {blog.coverImage && <meta property="og:image" content={blog.coverImage} />}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={seoTitle} />
        <meta property="twitter:description" content={seoDesc} />
        {blog.coverImage && <meta property="twitter:image" content={blog.coverImage} />}
      </Helmet>

      <Box component="article" sx={{ pb: 2, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Hero Header */}
        <Box 
          sx={{ 
            bgcolor: 'background.paper', 
            py: { xs: 6, md: 10 }, 
            borderBottom: 1, 
            borderColor: 'divider',
            mb: 6
          }}
        >
          <Container maxWidth="md">
            <Box sx={{ mb: 3 }}>
              <Chip 
                label={blog.category?.name || 'Uncategorized'} 
                color="primary" 
                variant="outlined" 
                sx={{ fontWeight: 'bold' }}
              />
            </Box>
            
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 1.2 }}>
              {blog.title}
            </Typography>

            <Typography variant="h5" color="text.secondary" sx={{ mb: 4, lineHeight: 1.5 }}>
              {blog.excerpt}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, color: 'text.secondary', flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon fontSize="small" />
                <Typography>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon fontSize="small" />
                <Typography>{blog.readingTime} min read</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VisibilityIcon fontSize="small" />
                <Typography>{blog.viewsCount} views</Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {blog.coverImage && (
            <Box 
              component="img" 
              src={blog.coverImage} 
              alt={blog.title}
              sx={{ 
                width: '100%', 
                maxHeight: '600px', 
                objectFit: 'cover', 
                borderRadius: 2, 
                mb: 6,
                boxShadow: 3
              }} 
            />
          )}

          <Box sx={{ 
            typography: 'body1', 
            '& h1, & h2, & h3, & h4': { mt: 4, mb: 2, fontWeight: 'bold' },
            '& p': { mb: 2, lineHeight: 1.8, fontSize: '1.1rem' },
            '& img': { maxWidth: '100%', height: 'auto', borderRadius: 2, my: 4 },
            '& a': { color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            '& blockquote': { borderLeft: '4px solid', borderColor: 'primary.main', pl: 3, my: 4, fontStyle: 'italic', color: 'text.secondary' },
            '& pre': { p: 2, borderRadius: 2, overflowX: 'auto', bgcolor: '#f5f5f5' },
            '& code': { fontFamily: 'monospace', bgcolor: '#f5f5f5', px: 1, py: 0.5, borderRadius: 1 }
          }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </Box>

          <Divider sx={{ my: 6 }} />

          {blog.tags && blog.tags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mr: 2, alignSelf: 'center' }}>TAGS:</Typography>
              {blog.tags.map((relation) => (
                <Chip key={relation.tag.id} label={relation.tag.name} variant="outlined" />
              ))}
            </Box>
          )}

          <Box sx={{ mt: 'auto' }}>
            <NewsletterSubscribe />
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default BlogDetail;
