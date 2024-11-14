import { motion } from 'framer-motion';

export default function Messages() {
  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
          私信
        </h1>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          <p>暂无消息</p>
        </div>
      </motion.div>
    </div>
  );
} 
