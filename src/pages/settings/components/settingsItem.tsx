// Node Modules
import { useState } from 'react';

interface SettingsItemProps {
  name: string;
  description: string;
}

export const SettingsItem = ({ name, description }: SettingsItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleExpand = () => {
    setIsOpen(!isOpen);
  };

  const accordion = document.querySelector('.accordion');

  console.log(accordion?.scrollHeight);

  return (
    <div className="px-4">
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
            ? { maxHeight: accordion.scrollHeight + 'px' }
            : {}
        }
        className={`accordion ${isOpen ? '' : 'max-h-0'} `}
      >
        This is the accordion
      </div>
    </div>
  );
};
