import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Layout from '../components/Layout';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/auth" element={<Auth />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 
