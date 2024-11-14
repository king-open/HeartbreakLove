import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { EllipsisHorizontalIcon, TrashIcon, FlagIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';

export default function CommentMenu({ onDelete, onReport }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300" ref={menuRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
                 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300
                 transition-all duration-300"
      >
        <EllipsisHorizontalIcon className="w-3.5 h-3.5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -2 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-1 w-24 bg-white dark:bg-gray-800 
                     rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50
                     overflow-hidden z-50 backdrop-blur-sm"
          >
            <div className="py-0.5">
              <motion.button
                onClick={() => {
                  onDelete();
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.08)' }}
                className="w-full px-2 py-1 text-left text-xs flex items-center gap-1.5
                         text-red-500/90 hover:text-red-500"
              >
                <TrashIcon className="w-3 h-3" />
                删除
              </motion.button>
              <motion.button
                onClick={() => {
                  onReport();
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.08)' }}
                className="w-full px-2 py-1 text-left text-xs flex items-center gap-1.5
                         text-gray-500/90 hover:text-gray-600 dark:text-gray-400 
                         dark:hover:text-gray-300"
              >
                <FlagIcon className="w-3 h-3" />
                举报
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

CommentMenu.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onReport: PropTypes.func.isRequired,
}; 
