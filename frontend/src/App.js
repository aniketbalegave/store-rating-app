import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/login';
import Navbar from './components/navbar';
 // import SignupPage from './pages/SignupPage';
// import StoreList from './pages/storedetails';
import StoreDetail from './pages/storedetails';
// import AdminDashboard from './pages/AdminDashboard';
// import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
// import ChangePassword from './pages/ChangePassword';
// import NotFound from './pages/NotFound';

import { useAuth } from './context/authcontext';

function App() {
  const { user } = useAuth();


  const ProtectedRoute = ({ children, roles }) => {
    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
    return children;
  };

  return (
   
    <Routes>
      
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
     

      {/* Role-protected routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['admin']}>
          
          </ProtectedRoute>
        }
      />
      <Route
        path="/store-owner"
        element={
          <ProtectedRoute roles={['store_owner']}>
            {/* <StoreOwnerDashboard /> */}
          </ProtectedRoute>
        }
      />
      <Route
        path="/stores"
        element={
          <ProtectedRoute roles={['normal']}>
            {/* <StoreList /> */}
          </ProtectedRoute>
        }
      />
      <Route
        path="/stores/:id"
        element={
          <ProtectedRoute roles={['normal']}>
            <StoreDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/change-password"
        element={
          <ProtectedRoute roles={['admin', 'normal', 'store_owner']}>
            {/* <ChangePassword /> */}
          </ProtectedRoute>
        }
      />

      {/* Default route */}
      <Route path="/" element={<Navigate to={user ? getDashboardRoute(user.role) : '/login'} />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

function getDashboardRoute(role) {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'store_owner':
      return '/store-owner';
    case 'normal':
      return '/stores';
    default:
      return '/login';
  }
}

export default App;
