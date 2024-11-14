import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';

export default function BackgroundUploadModal({ isOpen, onClose, onUpload }) {
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSave = () => {
    if (previewUrl) {
      onUpload(previewUrl);
      setPreviewUrl('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            更换背景图片
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center
                     transition-colors duration-300 cursor-pointer
                     ${isDragging 
                       ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                       : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />

          {previewUrl ? (
            <div className="relative aspect-video">
              <img
                src={previewUrl}
                alt="预览"
                className="w-full h-full object-cover rounded-lg"
              />
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewUrl('');
                }}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white
                         hover:bg-black/70 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XMarkIcon className="w-4 h-4" />
              </motion.button>
            </div>
          ) : (
            <div className="space-y-2">
              <PhotoIcon className="w-12 h-12 mx-auto text-gray-400" />
              <div className="text-sm text-gray-500 dark:text-gray-400">
                点击或拖拽图片到这里上传
              </div>
              <div className="text-xs text-gray-400">
                支持 JPG、PNG 格式
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 
                     dark:hover:text-gray-300 transition-colors"
          >
            取消
          </button>
          <motion.button
            onClick={handleSave}
            disabled={!previewUrl}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 text-sm bg-primary-500 text-white rounded-lg
                     hover:bg-primary-600 transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed"
          >
            保存
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

BackgroundUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
}; 
