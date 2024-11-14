import { useLocation } from 'react-router-dom';
import { HomeIcon, UserCircleIcon, PlusCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import CreatePostModal from './CreatePostModal';
import NavItem from './NavItem';

export default function Navbar() {
  const location = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreatePost = async (newPost) => {
    if (window.addNewPost) {
      window.addNewPost(newPost);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 
                    shadow-lg border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center py-3">
            <NavItem 
              to="/"
              icon={HomeIcon}
              label="首页"
              isActive={location.pathname === '/'}
            />
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex flex-col items-center space-y-1 
                     -mt-8 bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400
                     text-white p-4 rounded-full shadow-lg 
                     transform transition-transform hover:scale-110"
            >
              <PlusCircleIcon className="w-8 h-8" />
            </button>
            <NavItem 
              to="/messages"
              icon={ChatBubbleLeftRightIcon}
              label="消息"
              isActive={location.pathname === '/messages'}
            />
            <NavItem 
              to="/profile"
              icon={UserCircleIcon}
              label="我的"
              isActive={location.pathname === '/profile'}
            />
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
