// Providers
import { useSidebarState } from 'components/sidebar/sidebarProvider';

// Components
import { sidebarItems } from 'components/sidebar/constant/sidebarItems';
import { NestedSidebarItem } from 'components/sidebar/nestedSidebarItem';
import { useEffect } from 'react';
import { useSession } from 'providers/sessionProvider';
import { ArrowRightIcon } from 'icons';

export const SidebarAccordion = () => {
  const { isAccordionOpen, setIsAccordionOpen, hovered } = useSidebarState();
  const [session] = useSession();

  const sidebarItem = sidebarItems.find((x) => x.path === hovered);

  useEffect(() => {
    if (sidebarItem?.nestedItems) {
      return;
    }
    setIsAccordionOpen(false);
  }, [sidebarItem, setIsAccordionOpen]);

  return (
    <div
      style={isAccordionOpen ? { maxWidth: '256px' } : {}}
      className={`sidebarAccordion h-screen absolute left-accordion ${
        isAccordionOpen ? '' : 'max-w-0'
      } bg-green-650`}
      onMouseLeave={() => {
        setIsAccordionOpen(false);
      }}
    >
      <div className="flex flex-col h-screen justify-between">
        <div>
          <div className="my-8 mx-4 w-accordion overflow-hidden text-white">
            {sidebarItem ? (sidebarItem.nestedItems ? sidebarItem.name : null) : null}
          </div>
          {sidebarItem?.nestedItems
            ? sidebarItem.nestedItems.map((item, index) => {
                return <NestedSidebarItem key={index} {...item} />;
              })
            : null}
        </div>
        <div className="mb-8 text-white  cursor-pointer mx-4 text-sm w-accordion overflow-hidden">
          <div>
            {session.user?.firstName} {session.user?.lastName}
          </div>
          <div className="flex opacity-75">
            <div>{session.user?.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
