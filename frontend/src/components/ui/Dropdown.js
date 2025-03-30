import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';

const Dropdown = ({ 
  trigger,
  children,
  position = 'left',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center"
      >
        {trigger}
        <ChevronDownIcon 
          className={`h-4 w-4 ml-1 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div 
          className={`absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${positionClasses[position]}`}
          onClick={() => setIsOpen(false)}
        >
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;