import { motion } from 'framer-motion';
import { UserCircleIcon, PencilSquareIcon, CameraIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import PostCard from '../components/PostCard';

export default function Profile() {
  const [userPosts] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=800',
      content: '时光静好，愿你安好。无论经历什么，记住保持微笑。',
      likes: 128,
      comments: [],
      liked: false,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      content: '新的一天，新的开始。',
      likes: 56,
      comments: [],
      liked: false,
    },
  ]);

  const [userInfo] = useState({
    name: '阳光灿烂',
    bio: '热爱生活，享受当下',
    postsCount: 12,
    followersCount: 256,
    followingCount: 128,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 个人信息卡片 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="flex items-start gap-6">
          <div className="relative group">
            <UserCircleIcon className="w-24 h-24 text-gray-400" />
            <div className="absolute inset-0 flex items-center justify-center 
                          bg-black bg-opacity-50 rounded-full opacity-0 
                          group-hover:opacity-100 transition-opacity cursor-pointer">
              <div className="flex flex-col items-center text-white">
                <CameraIcon className="w-8 h-8" />
                <span className="text-xs mt-1">更换头像</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userInfo.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {userInfo.bio}
                </p>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 
                               text-white rounded-full hover:bg-primary-600 transition-colors">
                <PencilSquareIcon className="w-5 h-5" />
                编辑资料
              </button>
            </div>

            <div className="flex gap-6 mt-6">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {userInfo.postsCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">帖子</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {userInfo.followersCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">关注者</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {userInfo.followingCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">正在关注</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 标签页 */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="flex gap-8">
          <button className="px-4 py-2 text-primary-500 border-b-2 border-primary-500">
            我的帖子
          </button>
          <button className="px-4 py-2 text-gray-500 hover:text-primary-500">
            喜欢的帖子
          </button>
        </nav>
      </div>

      {/* 帖子列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 
