import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function AvatarUploadModal({ isOpen, onClose, onUpload }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [scale, setScale] = useState(1);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (previewUrl) {
      onUpload(previewUrl);
      onClose();
      setPreviewUrl(null);
      setScale(1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            更换头像
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {!previewUrl ? (
            <label className="block text-center p-8 border-2 border-dashed border-gray-300 
                            dark:border-gray-600 rounded-lg cursor-pointer
                            hover:border-primary-500 dark:hover:border-primary-500 
                            transition-colors">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className="text-gray-500 dark:text-gray-400">
                <p>点击或拖拽图片到这里</p>
                <p className="text-sm mt-1">支持 JPG、PNG 格式</p>
              </div>
            </label>
          ) : (
            <div className="space-y-4">
              <div className="relative w-48 h-48 mx-auto overflow-hidden rounded-full">
                <img 
                  src={previewUrl}
                  alt="预览"
                  className="w-full h-full object-cover"
                  style={{ 
                    transform: `scale(${scale})`,
                    transition: 'transform 0.2s'
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>缩小</span>
                  <span>放大</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none 
                           cursor-pointer dark:bg-gray-700"
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => {
                    setPreviewUrl(null);
                    setScale(1);
                  }}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 
                           dark:hover:text-gray-300 transition-colors"
                >
                  重新选择
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg 
                           hover:bg-primary-600 transition-colors"
                >
                  确认
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

AvatarUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
};
