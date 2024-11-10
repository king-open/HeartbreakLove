import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import Welcome from './pages/Welcome';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Layout from './components/Layout';

// 保护路由的高阶组件
const ProtectedRoute = ({ children }) => {
  const isDev = import.meta.env.DEV;
  const isAuthenticated = isDev ? true : false;
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

// 已登录用户访问登录页面时重定向到首页
const AuthRoute = ({ children }) => {
  const isDev = import.meta.env.DEV;
  const isAuthenticated = isDev ? true : false;
  
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

// 添加 PropTypes 验证
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <BrowserRouter future={{ 
      v7_startTransition: true,
      v7_relativeSplatPath: true 
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
        >
          <Routes>
            <Route path="/" element={
              <AuthRoute>
                <Welcome />
              </AuthRoute>
            } />
            <Route path="/auth" element={
              <AuthRoute>
                <Auth />
              </AuthRoute>
            } />
            <Route element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
