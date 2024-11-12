import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import CommentSection from './CommentSection';

export default function PostCard({ post }) {
  const commentRef = useRef(null);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.comments.length);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleCommentClick = (e) => {
    e.stopPropagation();
    setIsCommenting(true);
    commentRef.current?.scrollToComments();
  };

  const handleNewComment = () => {
    setCommentsCount(prev => prev + 1);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (!isLiked) {
      setLikesCount(prev => prev + 1);
    } else {
      setLikesCount(prev => prev - 1);
    }
    setIsLiked(!isLiked);
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
            <button 
              onClick={handleLikeClick}
              className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors"
            >
              {isLiked ? (
                <HeartIconSolid className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span>{likesCount}</span>
            </button>
            <button 
              onClick={handleCommentClick}
              className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors cursor-pointer"
            >
              <ChatBubbleLeftIcon className="w-5 h-5" />
              <span>{commentsCount}</span>
            </button>
          </div>
          
          <span className="text-xs text-gray-400">
            刚刚
          </span>
        </div>
      </div>
      <CommentSection 
        ref={commentRef} 
        comments={post.comments} 
        isCommenting={isCommenting}
        onClose={() => setIsCommenting(false)}
        onNewComment={handleNewComment}
      />
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
