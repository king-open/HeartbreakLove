import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UserCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import CreatePostModal from './CreatePostModal';

export default function Navbar() {
  const location = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreatePost = async (newPost) => {
    // 这里可以添加发布帖子的逻辑
    console.log('New post:', newPost);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 
                    shadow-lg border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center py-3">
            <Link 
              to="/"
              className={`flex flex-col items-center space-y-1
                      ${location.pathname === '/' 
                        ? 'text-primary-500' 
                        : 'text-gray-500 hover:text-primary-500'}`}
            >
              <HomeIcon className="w-6 h-6" />
              <span className="text-xs">首页</span>
            </Link>
            
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex flex-col items-center space-y-1 
                     -mt-8 bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400
                     text-white p-4 rounded-full shadow-lg 
                     transform transition-transform hover:scale-110"
            >
              <PlusCircleIcon className="w-8 h-8" />
            </button>
            
            <Link 
              to="/profile"
              className={`flex flex-col items-center space-y-1
                      ${location.pathname === '/profile' 
                        ? 'text-primary-500' 
                        : 'text-gray-500 hover:text-primary-500'}`}
            >
              <UserCircleIcon className="w-6 h-6" />
              <span className="text-xs">我的</span>
            </Link>
          </div>
        </div>
      </nav>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </>
  );
} 
