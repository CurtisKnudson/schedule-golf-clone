// Node Modules
import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Hooks
import makeContextHook from 'hooks/makeContextHooks';

export interface SidebarState {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  isAccordionOpen: boolean;
  setIsAccordionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hovered: string;
  setHovered: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarStateContext = createContext<SidebarState | undefined>(undefined);

export const useSidebarState = makeContextHook(SidebarStateContext);

const SidebarStateProvider = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const [selected, setSelected] = useState(pathname);
  // TODO: Need to check for nested routes properly
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [hovered, setHovered] = useState('');

  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);
  return (
    <SidebarStateContext.Provider
      value={{
        selected,
        setSelected,
        isAccordionOpen,
        setIsAccordionOpen,
        hovered,
        setHovered,
      }}
    >
      {children}
    </SidebarStateContext.Provider>
  );
};

export default SidebarStateProvider;
