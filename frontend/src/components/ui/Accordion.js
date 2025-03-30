import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';

const Accordion = ({
  items,
  multiple = false,
  defaultOpen = [],
  className = ''
}) => {
  const [openItems, setOpenItems] = useState(defaultOpen);

  const toggleItem = (index) => {
    if (multiple) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className={classNames('space-y-2', className)}>
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 focus:outline-none"
            onClick={() => toggleItem(index)}
          >
            <span className="font-medium text-gray-900">
              {item.title}
            </span>
            <ChevronDownIcon className={classNames(
              'h-5 w-5 text-gray-500 transform transition-transform',
              openItems.includes(index) ? 'rotate-180' : ''
            )} />
          </button>
          <div className={classNames(
            'px-4 pb-4 transition-all duration-300 ease-in-out',
            openItems.includes(index) ? 'block' : 'hidden'
          )}>
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;