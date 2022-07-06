// Node Modules
import { Link } from 'react-router-dom';

export interface SidebarItemProps {
  children: JSX.Element;
  path: string;
  selected: string;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({ children, path, selected }) => {
  return (
    <div className="my-2">
      <Link to={path}>
        <div
          className={`p-2 rounded cursor-pointer bg-green ${
            path === selected ? 'bg-green-850' : ''
          }  hover:bg-green-850`}
        >
          {children}
        </div>
      </Link>
    </div>
  );
};
