import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { XMarkIcon, PhotoIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';

export default function CreatePostModal({ isOpen, onClose, onSubmit }) {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        alert('请选择图片文件');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !imageFile) return;

    setIsSubmitting(true);
    
    const newPost = {
      id: Date.now(),
      content,
      ...(imageFile && { image: previewUrl }),
      likes: 0,
      comments: [],
      liked: false,
      timestamp: new Date().toISOString(),
    };

    try {
      await onSubmit(newPost);
      setContent('');
      setImageFile(null);
      setPreviewUrl('');
      setShowImageUpload(false);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />

          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-6 h-6 text-primary-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  分享新动态
                </h3>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300
                         transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="分享你的想法..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 
                           dark:border-gray-600 dark:bg-gray-700 
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent
                           transition-all duration-300"
                />
              </motion.div>

              {!showImageUpload && !previewUrl && (
                <motion.button
                  type="button"
                  onClick={() => setShowImageUpload(true)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-500 
                           hover:text-primary-500 transition-colors rounded-lg
                           hover:bg-gray-100 dark:hover:bg-gray-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PhotoIcon className="w-5 h-5" />
                  <span>添加图片</span>
                </motion.button>
              )}

              <AnimatePresence mode="wait">
                {(showImageUpload || previewUrl) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 
                             rounded-lg p-4 hover:border-primary-500 dark:hover:border-primary-500 
                             transition-colors cursor-pointer overflow-hidden"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    
                    {!previewUrl ? (
                      <motion.div 
                        className="flex flex-col items-center justify-center py-8 text-gray-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <PhotoIcon className="w-12 h-12 mb-2" />
                        <p className="text-sm">点击或拖拽图片到这里</p>
                        <p className="text-xs mt-1">支持 JPG、PNG 格式</p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="relative group"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <img
                          src={previewUrl}
                          alt="预览"
                          className="w-full rounded-lg"
                        />
                        <motion.div 
                          className="absolute inset-0 bg-black bg-opacity-50 opacity-0 
                                   group-hover:opacity-100 transition-opacity rounded-lg
                                   flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <motion.button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setImageFile(null);
                              setPreviewUrl('');
                              setShowImageUpload(false);
                            }}
                            className="text-white px-4 py-2 rounded-lg bg-red-500/80 
                                     hover:bg-red-600 transition-colors backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            移除图片
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div 
                className="flex justify-end space-x-2 pt-4 border-t dark:border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 
                           dark:hover:text-gray-300 transition-colors rounded-lg
                           hover:bg-gray-100 dark:hover:bg-gray-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  取消
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting || (!content.trim() && !imageFile)}
                  className="relative px-6 py-2 text-white rounded-lg overflow-hidden
                           bg-gradient-to-r from-primary-500 to-secondary-500
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        <span>发布中...</span>
                      </motion.div>
                    ) : (
                      <motion.span
                        key="submit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        发布
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

CreatePostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}; 
