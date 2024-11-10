import { motion } from 'framer-motion';

export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 pb-20"
    >
      <h1 className="text-2xl font-bold mb-6">个人主页</h1>
      {/* 内容将在后续实现 */}
    </motion.div>
  );
} 
