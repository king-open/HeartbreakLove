import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import PostCard from '../components/PostCard';
import { mockPosts } from '../services/mockData';

export default function Home() {
  const [page, setPage] = useState(1);
  
  // 使用 SWR 获取第一页数据
  const { data: firstPageData, mutate: mutateFirstPage } = useSWR('posts-1', () => mockPosts.fetchPosts(1), {
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

  // 修改添加新帖子的函数
  const addNewPost = (newPost) => {
    // 保存到 mockData
    const savedPost = mockPosts.addNewPost(newPost);
    // 更新第一页数据
    mutateFirstPage(currentData => {
      return [savedPost, ...(currentData || [])];
    }, false);
  };

  // 将 addNewPost 函数传递给全局
  useEffect(() => {
    window.addNewPost = addNewPost;
    return () => {
      delete window.addNewPost;
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
          高能量的时刻
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
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.button
              key="loading"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              disabled
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 
                       text-white rounded-full transition-all inline-flex items-center justify-center"
            >
              <motion.span
                animate={{
                  opacity: [1, 0.5, 1],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                加载中...
              </motion.span>
            </motion.button>
          ) : (
            <>
              {error && <ErrorState message={error} onRetry={loadMore} />}
              
              {!error && hasMore && (
                <motion.button
                  key="loadMore"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={loadMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 
                           text-white rounded-full transition-all hover:opacity-90"
                >
                  加载更多
                </motion.button>
              )}
            </>
          )}
        </AnimatePresence>

        {!hasMore && posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 dark:text-gray-400 py-4"
          >
            已经到底啦 ~
          </motion.div>
        )}
      </div>
    </div>
  );
}
