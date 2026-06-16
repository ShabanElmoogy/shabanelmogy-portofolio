import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from '../../api/blogAdminApi';
import ArticleIcon from '@mui/icons-material/Article';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleIcon from '@mui/icons-material/People';
import PublishIcon from '@mui/icons-material/Publish';

const StatCard = ({ title, value, icon, color }) => (
  <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3, borderRadius: 2 }}>
    <Box sx={{ 
      bgcolor: `${color}.light`, 
      color: `${color}.main`, 
      p: 2, 
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{value}</Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
        {title}
      </Typography>
    </Box>
  </Paper>
);

const AdminDashboard = () => {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats
  });

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
  }

  if (isError || !stats) {
    return <Typography color="error">Failed to load dashboard statistics.</Typography>;
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>Dashboard Overview</Typography>
      
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Total Blogs" 
            value={stats.totalBlogs} 
            icon={<ArticleIcon fontSize="large" />} 
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Published Blogs" 
            value={stats.publishedBlogs} 
            icon={<PublishIcon fontSize="large" />} 
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Total Views" 
            value={stats.totalViews} 
            icon={<VisibilityIcon fontSize="large" />} 
            color="info"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Newsletter Subs" 
            value={stats.totalSubscribers} 
            icon={<PeopleIcon fontSize="large" />} 
            color="secondary"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
