import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { HeartIcon, ChatBubbleLeftIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

// 模拟 API 请求函数
const fetchPosts = async (page) => {
  // 模拟网络请求
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 第一页使用固定数据
  if (page === 1) {
    return [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=800',
        content: '时光静好，愿你安好。无论经历什么，记住保持微笑。',
        likes: 128,
        comments: 32,
        liked: false,
      },
    ];
  }

  // 其他页面返回随机数据
  return [
    {
      id: Date.now(),
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      content: '新的一天，新的开始。',
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
      liked: false,
    },
  ];
};

export default function Home() {
  const [page, setPage] = useState(1);
  
  // 使用 SWR 获取第一页数据，禁用自动重新验证
  const { data: firstPageData } = useSWR('posts-1', () => fetchPosts(1), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  // 使用 state 管理后续页面的数据
  const [additionalPosts, setAdditionalPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // 合并所有数据
  const posts = [...(firstPageData || []), ...additionalPosts];

  // 加载更多数据
  const loadMore = async () => {
    if (loading) return;
    
    setLoading(true);
    setError(null);

    try {
      const nextPage = page + 1;
      const newPosts = await fetchPosts(nextPage);
      
      setAdditionalPosts(prev => [...prev, ...newPosts]);
      setPage(nextPage);
      
      // 模拟数据到达末尾
      if (nextPage >= 3) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 加载状态组件
  const LoadingState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center space-x-2 text-gray-500"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full"
      />
      <span>加载中...</span>
    </motion.div>
  );

  // 错误状态组件
  const ErrorState = ({ message, onRetry }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center space-y-2 text-red-500"
    >
      <ExclamationCircleIcon className="w-6 h-6" />
      <p className="text-sm">{message}</p>
      <button
        onClick={onRetry}
        className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
      >
        点击重试
      </button>
    </motion.div>
  );

  // 添加 PropTypes 验证
  ErrorState.propTypes = {
    message: PropTypes.string.isRequired,
    onRetry: PropTypes.func.isRequired,
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
          治愈时刻
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          在这里分享你的故事
        </div>
      </header>

      <AnimatePresence mode="wait">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              {/* 帖子内容保持不变 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </motion.div>
              
              <div className="p-4">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {post.content}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors">
                      {post.liked ? (
                        <HeartIconSolid className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors">
                      <ChatBubbleLeftIcon className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  
                  <span className="text-xs text-gray-400">
                    刚刚
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <div className="mt-8 text-center space-y-4">
        {loading && <LoadingState />}
        
        {error && <ErrorState message={error} onRetry={loadMore} />}
        
        {!loading && !error && hasMore && (
          <motion.button
            onClick={loadMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 
                     text-white rounded-full transition-all hover:opacity-90"
          >
            加载更多
          </motion.button>
        )}

        {!hasMore && posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 dark:text-gray-400"
          >
            已经到底啦 ~
          </motion.div>
        )}
      </div>
    </div>
  );
}
