import { useState } from 'react';

const Tooltip = ({ 
  content, 
  position = 'top',
  children 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2'
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          className={`absolute z-50 w-max max-w-xs px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg ${positionClasses[position]}`}
          role="tooltip"
        >
          {content}
          <div className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${getArrowPosition(position)}`} />
        </div>
      )}
    </div>
  );
};

// Helper function for tooltip arrow positioning
const getArrowPosition = (position) => {
  switch(position) {
    case 'top':
      return 'top-full left-1/2 -translate-x-1/2 -mt-1';
    case 'right':
      return 'top-1/2 right-full -translate-y-1/2 -mr-1';
    case 'bottom':
      return 'bottom-full left-1/2 -translate-x-1/2 -mb-1';
    case 'left':
      return 'top-1/2 left-full -translate-y-1/2 -ml-1';
    default:
      return '';
  }
};

export default Tooltip;