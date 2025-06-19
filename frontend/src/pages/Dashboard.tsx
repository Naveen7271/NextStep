import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../components/auth/api';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!getToken()) {
      navigate('/');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  
  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '50px auto', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', margin: 0 }}>Welcome to the Dashboard!</h2>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      <div style={{ 
        padding: '20px', 
        backgroundColor: 'white', 
        borderRadius: '4px', 
        border: '1px solid #ddd' 
      }}>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '15px' }}>
          This is a protected route. You have successfully logged in!
        </p>
        <p style={{ fontSize: '14px', color: '#888' }}>
          You can now access all the features of the application.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;