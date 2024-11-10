import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './Navigation';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>
      <Navigation />
    </div>
  );
} 
