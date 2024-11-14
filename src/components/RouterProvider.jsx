import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// 集中处理 React Router 的配置
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  },
};

export default function RouterProvider({ children }) {
  return (
    <BrowserRouter {...routerConfig}>
      {children}
    </BrowserRouter>
  );
}

RouterProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 
