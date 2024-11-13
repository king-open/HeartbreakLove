import { motion, AnimatePresence } from 'framer-motion';
import { UserCircleIcon, PencilSquareIcon, CameraIcon } from '@heroicons/react/24/solid';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import AvatarUploadModal from '../components/AvatarUploadModal';
import ProfileEditModal from '../components/ProfileEditModal';
import { initialPosts, initialUserInfo } from '../config/initialData';

export default function Profile() {
  const [userPosts] = useState(initialPosts);
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [stats, setStats] = useState({
    postsCount: userPosts.length,
    followersCount: 0,
    followingCount: 0
  });

  const [isFollowed, setIsFollowed] = useState(false);

  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'likes'

  const [likedPosts] = useState([
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      content: '分享一个美好的瞬间',
      likes: 45,
      comments: [],
      liked: true,
      timestamp: new Date().toISOString(),
    }
  ]);

  const displayPosts = activeTab === 'posts' ? userPosts : likedPosts;

  const handleAvatarUpload = (imageUrl) => {
    setAvatarUrl(imageUrl);
  };

  const handleProfileSave = (newData) => {
    setUserInfo(prev => ({
      ...prev,
      name: newData.name,
      bio: newData.bio,
      mood: newData.mood,
      tags: newData.tags,
    }));
  };

  const handleFollowClick = () => {
    if (!isFollowed) {
      setStats(prev => ({
        ...prev,
        followersCount: prev.followersCount + 1
      }));
    } else {
      setStats(prev => ({
        ...prev,
        followersCount: Math.max(0, prev.followersCount - 1)
      }));
    }
    setIsFollowed(!isFollowed);
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' && !document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 个人信息卡片 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative"
      >
        {/* 修改暗黑模式切换按钮 */}
        <motion.button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 rounded-full
                   bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm
                   text-gray-600 dark:text-gray-300
                   hover:bg-gray-200 dark:hover:bg-gray-600
                   transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-5 h-5">
            <motion.div
              initial={false}
              animate={{
                rotate: isDarkMode ? 45 : 0,
                scale: isDarkMode ? 0 : 1,
                opacity: isDarkMode ? 0 : 1
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <SunIcon className="w-5 h-5 text-orange-400" />
            </motion.div>
            
            <motion.div
              initial={false}
              animate={{
                rotate: isDarkMode ? 0 : -45,
                scale: isDarkMode ? 1 : 0,
                opacity: isDarkMode ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <MoonIcon className="w-5 h-5 text-indigo-300" />
            </motion.div>
          </div>
        </motion.button>

        {/* 基本信息区域 */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* 左侧：头像和编辑按钮 */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-full overflow-hidden shadow-lg"
              >
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="用户头像" 
                    className="w-24 h-24 object-cover"
                  />
                ) : (
                  <UserCircleIcon className="w-24 h-24 text-gray-400" />
                )}
              </motion.div>
              <div 
                className="absolute inset-0 flex items-center justify-center 
                          bg-black bg-opacity-40 rounded-full opacity-0 
                          group-hover:opacity-100 transition-all duration-200
                          cursor-pointer"
                onClick={() => setIsAvatarModalOpen(true)}
              >
                <CameraIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <motion.button 
              onClick={() => setIsEditModalOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 text-sm
                       bg-gray-100 dark:bg-gray-700 
                       text-gray-600 dark:text-gray-300
                       rounded-full hover:bg-gray-200 dark:hover:bg-gray-600
                       transition-colors"
            >
              <PencilSquareIcon className="w-4 h-4" />
              编辑资料
            </motion.button>
          </div>

          {/* 右侧：用户信息 */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {userInfo.name}
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {userInfo.bio}
              </p>
            </div>

            {/* 数据统计 */}
            <div className="flex gap-6 py-3">
              <div className="text-center">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {stats.postsCount}
                </div>
                <div className="text-sm text-gray-500">帖子</div>
              </div>
              <motion.div 
                className="text-center cursor-pointer"
                onClick={handleFollowClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="font-semibold text-gray-900 dark:text-white">
                  {stats.followersCount}
                </div>
                <div className="text-sm text-gray-500">
                  {isFollowed ? '已关注' : '关注'}
                </div>
              </motion.div>
              <div className="text-center">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {stats.followingCount}
                </div>
                <div className="text-sm text-gray-500">正在关注</div>
              </div>
            </div>

            {/* 标签和心情 */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 
                             text-blue-600 dark:text-blue-300 rounded-full">
                {userInfo.mood}
              </span>
              {userInfo.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-sm bg-gray-50 dark:bg-gray-700 
                           text-gray-600 dark:text-gray-300 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 修改内容标签页 */}
      <div className="mt-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <motion.button 
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 font-medium text-sm relative
                     ${activeTab === 'posts' 
                       ? 'text-primary-500' 
                       : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            帖子
            {activeTab === 'posts' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  background: "linear-gradient(to right, #3B82F6, #10B981)"
                }}
              />
            )}
          </motion.button>
          <motion.button 
            onClick={() => setActiveTab('likes')}
            className={`px-6 py-3 font-medium text-sm relative
                     ${activeTab === 'likes' 
                       ? 'text-primary-500' 
                       : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            喜欢
            {activeTab === 'likes' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  background: "linear-gradient(to right, #3B82F6, #10B981)"
                }}
              />
            )}
          </motion.button>
        </div>
      </div>

      {/* 帖子列表 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* 模态框 */}
      <AvatarUploadModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onUpload={handleAvatarUpload}
      />
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userInfo={userInfo}
        onSave={handleProfileSave}
      />
    </div>
  );
} 
