// Node Modules
import { Link } from 'react-router-dom';
// Utils
import { keyDownHelper } from 'utils/onKeyDown';
// Provider
import { useSidebarState } from 'apps/admin/components/sidebar/sidebarProvider';

export interface SidebarItemProps {
  icon: JSX.Element;
  path: string;
  nestedItems: boolean;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, path, nestedItems }) => {
  const { selected, setIsAccordionOpen, setHovered, isAccordionOpen } = useSidebarState();

  const handleAccordion = () => {
    if (isAccordionOpen) {
      setIsAccordionOpen(false);
    }
  };
  return (
    <div
      className="my-2"
      onClick={handleAccordion}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => keyDownHelper(e, handleAccordion)}
    >
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
