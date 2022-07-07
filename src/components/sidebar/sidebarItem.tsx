// Node Modules
import { Link } from 'react-router-dom';
import { useSidebarState } from './sidebarProvider';

export interface SidebarItemProps {
  icon: JSX.Element;
  path: string;
  nestedItems: boolean;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, path, nestedItems }) => {
  const { selected, setIsAccordionOpen, setHovered } = useSidebarState();
  return (
    <div className="my-2">
      <Link
        to={path}
        onMouseEnter={() => {
          if (nestedItems) {
            setIsAccordionOpen(true);
          }
          setHovered(path);
        }}
      >
        <div
          className={`p-2 rounded cursor-pointer bg-green text-white opacity-75 ${
            path === selected ? 'bg-green-850 opacity-100' : ''
          }  hover:bg-green-850 hover:opacity-100`}
        >
          {icon}
        </div>
      </Link>
    </div>
  );
};
