import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UserIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: HomeIcon, label: '首页' },
    { path: '/create', icon: PlusCircleIcon, label: '添加' },
    { path: '/profile', icon: UserIcon, label: '我的' },
  ];

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="relative group flex flex-col items-center"
              >
                <motion.div
                  className={`p-2 rounded-full transition-colors ${
                    isActive 
                      ? 'text-primary-500' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-6 h-6" />
                  {isActive && (
                    <motion.div
                      layoutId="bubble"
                      className="absolute inset-0 bg-primary-100 dark:bg-primary-900/20 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.div>
                <span className={`text-xs mt-1 ${
                  isActive 
                    ? 'text-primary-500 font-medium' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
} 
