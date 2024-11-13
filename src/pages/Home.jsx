import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import PostCard from '../components/PostCard';
import { mockPosts } from '../services/mockData';

export default function Home() {
  const [page, setPage] = useState(1);
  
  // 使用 SWR 获取第一页数据
  const { data: firstPageData } = useSWR('posts-1', () => mockPosts.fetchPosts(1), {
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
      const newPosts = await mockPosts.fetchPosts(nextPage);
      
      setAdditionalPosts(prev => [...prev, ...newPosts]);
      setPage(nextPage);
      
      if (nextPage >= 3) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 更新加载状态组件
  const LoadingState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center py-8"
    >
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-900 
                         border-t-primary-500 rounded-full animate-spin" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full 
                       flex items-center justify-center">
          <div className="w-2 h-2 bg-primary-500 rounded-full" />
        </div>
      </div>
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
            <PostCard key={post.id} post={post} />
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
