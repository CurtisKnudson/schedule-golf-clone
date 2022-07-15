import { Link } from 'react-router-dom';

export const Client = () => {
  return (
    <div>
      <Link to="/admin" className="cursor-pointer border w-40 hover:bg-gray-400">
        Go To Admin Panel
      </Link>
    </div>
  );
};
