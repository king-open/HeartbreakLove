import { motion } from 'framer-motion';
import { useState } from 'react';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export default function Home() {
  const [hasMore, setHasMore] = useState(true); // 是否还有更多数据
  const [loading, setLoading] = useState(false); // 加载状态
  
  // 模拟数据
  const [posts] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=800',
      content: '时光静好，愿你安好。无论经历什么，记住保持微笑。',
      likes: 128,
      comments: 32,
      liked: false,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?w=800',
      content: '生活总是充满惊喜，保持希望，相信美好。',
      likes: 256,
      comments: 48,
      liked: true,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800',
      content: '愿你遇见的所有困难，都是通往更好未来的转机。',
      likes: 512,
      comments: 64,
      liked: false,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      content: '阳光温暖，微风不燥，愿你的心情如这般美好。',
      likes: 384,
      comments: 42,
      liked: false,
    },
  ]);

  // 加载更多数据
  const loadMore = async () => {
    setLoading(true);
    try {
      // 模拟异步加载
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 这里应该是实际的数据加载逻辑
      // 如果没有更多数据了，设置 hasMore 为 false
      setHasMore(false);
    } finally {
      setLoading(false);
    }
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
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

      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button
            onClick={loadMore}
            disabled={loading}
            className={`px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 
                      text-white rounded-full transition-all
                      ${loading 
                        ? 'opacity-70 cursor-not-allowed' 
                        : 'hover:opacity-90'}`}
          >
            {loading ? '加载中...' : '加载更多'}
          </button>
        </motion.div>
      )}

      {!hasMore && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center text-gray-500 dark:text-gray-400"
        >
          已经到底啦 ~
        </motion.div>
      )}
    </div>
  );
}
