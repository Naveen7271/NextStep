import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../components/auth/api';
import JobList from '../components/jobs/JobList';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <header style={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid #e9ecef',
        padding: '15px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <h1 style={{ 
            color: '#2c3e50',
            fontFamily: 'Raleway',
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: '600'
          }}>
            NextStep
          </h1>
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
          >
            Logout
          </button>
        </div>
      </header>
      
      <main>
        <JobList />
      </main>
    </div>
  );
};

export default Dashboard;