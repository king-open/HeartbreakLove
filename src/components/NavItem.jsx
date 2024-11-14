import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function NavItem({ to, icon: Icon, label, isActive }) {
  return (
    <Link 
      to={to}
      className={`flex flex-col items-center space-y-1
                ${isActive 
                  ? 'text-primary-500' 
                  : 'text-gray-500 hover:text-primary-500'}`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Icon className="w-6 h-6" />
      </motion.div>
      <span className="text-xs">{label}</span>
    </Link>
  );
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}; 
