import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '@/api/httpClient';

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

    try {
      const response = await http.post('/v1/auth/login', {
        username: credentials.username,
        password: credentials.password
      });

      // Store admin session
      localStorage.setItem('adminAuthenticated', 'true');
      localStorage.setItem('adminLoginTime', Date.now().toString());
      localStorage.setItem('adminToken', response.token);
      
      // Navigate to admin panel after successful login
      navigate('/admin/panel');
      
      // Reset form
      setCredentials({ username: '', password: '' });
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
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
