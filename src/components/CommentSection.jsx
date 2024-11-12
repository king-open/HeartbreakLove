import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const CommentSection = forwardRef(({ comments: initialComments, isCommenting, onClose, onNewComment }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(initialComments || []);
  const commentSectionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commentSectionRef.current && !commentSectionRef.current.contains(event.target)) {
        onClose();
        setIsOpen(false);
      }
    };

    if (isCommenting) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCommenting, onClose]);

  useEffect(() => {
    setIsOpen(isCommenting);
  }, [isCommenting]);

  useImperativeHandle(ref, () => ({
    scrollToComments: () => {
      commentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(true);
    },
    hideComments: () => {
      setIsOpen(false);
    }
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      content: newComment,
      author: '匿名用户',
      timestamp: new Date().toISOString(),
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    onNewComment?.();
  };

  return (
    <div ref={commentSectionRef} className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 space-y-4"
        >
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="写下你的评论..."
              className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 
                       focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-full 
                       hover:bg-primary-600 transition-colors"
            >
              发送
            </button>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <UserCircleIcon className="w-8 h-8 text-gray-400" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {comment.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
});

CommentSection.displayName = 'CommentSection';

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ),
  isCommenting: PropTypes.bool,
  onClose: PropTypes.func,
  onNewComment: PropTypes.func,
};

CommentSection.defaultProps = {
  isCommenting: false,
  onClose: () => {},
  onNewComment: () => {},
};

export default CommentSection;
