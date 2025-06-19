import React, { useState } from 'react';
import styles from './auth.module.css';
import { useNavigate } from 'react-router-dom';
import { loginUser, saveToken } from './api';

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
}

const Login: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await loginUser(formData.email, formData.password);
      saveToken(data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login clicked! This is a demo.`);
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Enter your credentials to access your account</p>
      </div>
      
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.labelContainer}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <button type="submit" className={styles.primaryButton}>
            Log In
          </button>
        </div>
        
        <div className={styles.divider}>
          <hr className={styles.dividerLine} />
          <span className={styles.dividerText}>or continue with</span>
        </div>
        
        <div className={styles.socialGrid}>
          <button
            type="button"
            className={styles.socialButton}
            onClick={() => handleSocialLogin('Google')}
          >
            <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            className={styles.socialButton}
            onClick={() => handleSocialLogin('Facebook')}
          >
            <svg className={styles.socialIcon} fill="#1877F2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;