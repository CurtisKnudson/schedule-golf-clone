// Node Modules
import { Link } from 'react-router-dom';
// Constants/Types
import { SidebarItem } from 'apps/admin/components/sidebar/constant/sidebarItems';
// Provider
import { useSidebarState } from 'apps/admin/components/sidebar/sidebarProvider';

export const NestedSidebarItem = (props: SidebarItem) => {
  const { name, icon, path } = props;
  const { setIsAccordionOpen, hovered } = useSidebarState();

  return (
    <div
      onClick={() => setIsAccordionOpen(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.code != 'Enter') {
          return;
        }
        setIsAccordionOpen(false);
      }}
    >
      <Link to={`${hovered}${path}`}>
        <div
          className="my-2 p-1.5 mx-4 overflow-hidden w-accordion text-white flex cursor-pointer opacity-75 hover:opacity-100
      "
        >
          <div className="mx-2">{icon}</div>
          <div>{name}</div>
        </div>
      </Link>
    </div>
  );
};
