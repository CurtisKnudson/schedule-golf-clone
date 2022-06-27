// Node Modules
import { useEffect, useState } from 'react';

interface SettingsItemProps {
  name: string;
  description: string;
  element: JSX.Element;
}

export const SettingsItem = ({ name, description, element }: SettingsItemProps) => {
  const accordion = document.querySelector('.accordion');
  const [isOpen, setIsOpen] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(
    accordion?.scrollHeight ? accordion.scrollHeight : undefined,
  );
  const handleExpand = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (accordion?.scrollHeight) {
        setScrollHeight(accordion?.scrollHeight);
        return;
      }
      setScrollHeight(undefined);
    };
    window.addEventListener('resize', handleResize);

    () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [accordion?.scrollHeight]);

  return (
    <div className="md:w-8/12">
      <div className="h-32 flex justify-between items-center">
        <div>
          <div className="font-bold text-2xl mb-2">{name}</div>
          <div className="my-2">{description}</div>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={handleExpand}
          className="bg-gray-400 rounded p-1 text-white text-sm font-light cursor-pointer hover:bg-gray-500 w-16 center-all"
          onKeyDown={(e) => {
            if (e.code != 'Enter') {
              return;
            }
            handleExpand();
          }}
        >
          {isOpen ? 'Collapse' : 'Expand'}
        </div>
      </div>
      <div
        style={
          accordion?.scrollHeight && isOpen
            ? { maxHeight: scrollHeight ? scrollHeight : accordion.scrollHeight }
            : {}
        }
        className={`accordion ${isOpen ? '' : 'max-h-0'}`}
      >
        {element}
      </div>
    </div>
  );
};
