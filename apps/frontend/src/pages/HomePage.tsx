import { Navigate } from 'react-router';

const HomePage = () => {
  return <Navigate to="/auth" replace />;
};

export default HomePage;
