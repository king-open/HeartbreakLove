import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function ProfileEditModal({ isOpen, onClose, userInfo, onSave }) {
  const [formData, setFormData] = useState({
    name: userInfo.name,
    bio: userInfo.bio,
    tags: userInfo.tags || [],
    mood: userInfo.mood || '开心',
  });

  const [bioLength, setBioLength] = useState(formData.bio.length);

  // 预设的心情选项
  const moodOptions = ['开心', '放松', '充实', '期待', '思考'];

  // 预设的标签选项
  const tagOptions = ['美食', '旅行', '运动', '音乐', '电影', '摄影', '阅读', '艺术', '科技'];

  // 添加状态管理
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'completed'

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveStatus('saving');
    
    // 模拟保存延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave(formData);
    setSaveStatus('completed');
    
    // 完成后延迟关闭
    setTimeout(() => {
      setSaveStatus('idle');
      onClose();
    }, 1000);
  };

  const handleBioChange = (e) => {
    const text = e.target.value;
    if (text.length <= 100) {
      setFormData(prev => ({ ...prev, bio: text }));
      setBioLength(text.length);
    }
  };

  const toggleTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
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
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-primary-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              编辑个人资料
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              昵称
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 
                       dark:border-gray-600 dark:bg-gray-700 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              maxLength={20}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              个人简介
            </label>
            <div className="relative">
              <textarea
                value={formData.bio}
                onChange={handleBioChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                         dark:border-gray-600 dark:bg-gray-700 
                         focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
                maxLength={100}
              />
              <span className="absolute bottom-2 right-2 text-xs text-gray-500">
                {bioLength}/100
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
              当前心情
            </label>
            <div className="flex flex-wrap justify-center gap-2">
              {moodOptions.map(mood => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, mood }))}
                  className={`px-4 py-2 rounded-full text-sm transition-colors
                            ${formData.mood === mood 
                              ? 'bg-primary-500 text-white' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
              个人标签
            </label>
            <div className="flex flex-wrap justify-center gap-2">
              {tagOptions.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors
                            ${formData.tags.includes(tag)
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 
                       dark:hover:text-gray-300 transition-colors"
              disabled={saveStatus !== 'idle'}
            >
              取消
            </button>
            <motion.button
              type="submit"
              disabled={saveStatus !== 'idle'}
              className="relative px-6 py-2 text-white rounded-lg overflow-hidden
                       bg-gradient-to-r from-blue-500 to-purple-500"
              whileHover={saveStatus === 'idle' ? { scale: 1.05 } : {}}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"
                initial={{ x: "100%" }}
                animate={saveStatus === 'completed' ? { x: 0 } : { x: "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              
              <motion.div className="relative z-10 flex items-center justify-center gap-2">
                {saveStatus === 'idle' && (
                  <motion.span
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    保存
                  </motion.span>
                )}
                
                {saveStatus === 'saving' && (
                  <motion.svg
                    className="w-5 h-5 animate-spin"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <path
                      className="opacity-25"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </motion.svg>
                )}
                
                {saveStatus === 'completed' && (
                  <motion.svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 6L9 17l-5-5"
                    />
                  </motion.svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

ProfileEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    mood: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};
