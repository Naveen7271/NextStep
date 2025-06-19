import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import styles from './auth.module.css';

type AuthMode = 'login' | 'register';

interface AuthContainerProps {
  defaultMode?: AuthMode;
  onLogin?: (data: { email: string; password: string }) => void;
  onRegister?: (data: any) => void;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
  defaultMode = 'login',
  onLogin,
  onRegister
}) => {
  const [activeMode, setActiveMode] = useState<AuthMode>(defaultMode);

  const handleTabClick = (mode: AuthMode) => {
    setActiveMode(mode);
  };

  return (
    <div className={styles.container}>
      {/* Background blobs */}
      <div className={`${styles.shapeBlob} ${styles.shapeBlobPurple}`}></div>
      <div className={`${styles.shapeBlob} ${styles.shapeBlobBlue}`}></div>
      
      <div className={styles.formContainer}>
        {/* Tabs */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${activeMode === 'login' ? styles.tabActive : ''}`}
            onClick={() => handleTabClick('login')}
          >
            Log In
          </button>
          <button
            className={`${styles.tab} ${activeMode === 'register' ? styles.tabActive : ''}`}
            onClick={() => handleTabClick('register')}
          >
            Register
          </button>
        </div>
        
        {/* Forms */}
        <div className={activeMode === 'login' ? '' : styles.hidden}>
          <Login onSubmit={onLogin} />
        </div>
        
        <div className={activeMode === 'register' ? '' : styles.hidden}>
          <Register onSubmit={onRegister} />
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;