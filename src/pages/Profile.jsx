import { motion } from 'framer-motion';
import { UserCircleIcon, PencilSquareIcon, CameraIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 个人信息卡片 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
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
            <div className="flex gap-6 py-3 border-y border-gray-100 dark:border-gray-700">
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

      {/* 内容标签页 */}
      <div className="mt-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button 
            className="px-6 py-3 text-primary-500 border-b-2 border-primary-500
                     font-medium text-sm"
          >
            帖子
          </button>
          <button 
            className="px-6 py-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300
                     font-medium text-sm"
          >
            喜欢
          </button>
        </div>
      </div>

      {/* 帖子列表 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

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
