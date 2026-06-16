import { useState } from 'react';
import { Box, Typography, Container, Grid, Pagination, Tabs, Tab, CircularProgress } from '@mui/material';
import BlogCard from './BlogCard';
import NewsletterSubscribe from './NewsletterSubscribe';
import { usePublicBlogs, usePublicCategories } from '../../hooks/usePublicBlogs';
import Header from '@/components/layout/Header/Header';

const BlogList = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(''); // '' means All

  const { data: categories = [] } = usePublicCategories();
  
  const { data: rawData, isLoading } = usePublicBlogs({
    page,
    pageSize: 9,
    category: selectedCategory
  });
  const data = /** @type {any} */ (rawData) || { items: [], totalPages: 0 };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
    setPage(1); // Reset to first page
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      <Container maxWidth="lg" sx={{ pt: 6, pb: 2, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
        Our Blog
      </Typography>
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6 }}>
        Insights, tutorials, and deep dives into software engineering.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs 
          value={selectedCategory} 
          onChange={handleCategoryChange} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ '& .MuiTab-root': { textTransform: 'none', fontSize: '1.1rem' } }}
        >
          <Tab label="All Posts" value="" />
          {categories.map((cat) => (
            <Tab key={cat.id} label={cat.name} value={cat.slug} />
          ))}
        </Tabs>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {data?.items?.map((blog) => (
              <Grid key={blog.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <BlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>

          {data?.items?.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <Typography variant="h6" color="text.secondary">
                No articles found in this category.
              </Typography>
            </Box>
          )}

          {data?.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination 
                count={data.totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
              />
            </Box>
          )}

          <Box sx={{ mt: 'auto' }}>
            <NewsletterSubscribe />
          </Box>
        </>
      )}
      </Container>
    </Container>
  );
};

export default BlogList;
