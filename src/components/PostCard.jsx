import { motion } from 'framer-motion';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import CommentSection from './CommentSection';

export default function PostCard({ post }) {
  const commentRef = useRef(null);

  const handleCommentMouseEnter = () => {
    commentRef.current?.scrollToComments();
  };

  const handleCommentMouseLeave = () => {
    commentRef.current?.hideComments();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
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
            <div 
              onMouseEnter={handleCommentMouseEnter}
              onMouseLeave={handleCommentMouseLeave}
              className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors cursor-pointer"
            >
              <ChatBubbleLeftIcon className="w-5 h-5" />
              <span>{post.comments.length}</span>
            </div>
          </div>
          
          <span className="text-xs text-gray-400">
            刚刚
          </span>
        </div>
      </div>
      <CommentSection ref={commentRef} comments={post.comments} />
    </motion.div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired,
    liked: PropTypes.bool.isRequired,
  }).isRequired,
}; 
