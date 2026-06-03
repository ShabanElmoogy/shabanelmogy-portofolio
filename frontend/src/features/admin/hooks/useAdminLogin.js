import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAdminLogin = (onClose) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Admin credentials from environment variables
  const ADMIN_CREDENTIALS = {
    // @ts-ignore
    username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
    // @ts-ignore
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123',
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      // Store admin session (in production, use proper authentication)
      localStorage.setItem('adminAuthenticated', 'true');
      localStorage.setItem('adminLoginTime', Date.now().toString());
      
      // Navigate to admin panel after successful login
      navigate('/admin/panel');
      
      // Reset form
      setCredentials({ username: '', password: '' });
    } else {
      setError('Invalid username or password');
    }
    
    setLoading(false);
  };

  const handleClose = () => {
    setCredentials({ username: '', password: '' });
    setError('');
    setShowPassword(false);
    if (onClose) onClose();
  };

  return {
    credentials,
    showPassword,
    setShowPassword,
    error,
    loading,
    handleChange,
    handleSubmit,
    handleClose
  };
};
