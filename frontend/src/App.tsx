import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContainer from './components/auth/AuthContainer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthContainer defaultMode="login" />} />
        <Route path="/register" element={<AuthContainer defaultMode="register" />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;