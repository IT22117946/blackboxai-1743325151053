import { useState } from 'react';

const Tabs = ({ 
  tabs,
  defaultActiveTab = 0,
  variant = 'default',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const variants = {
    default: 'border-b border-gray-200',
    pills: 'space-x-2',
    underline: 'border-b border-gray-200'
  };

  const tabVariants = {
    default: {
      active: 'border-primary text-primary',
      inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    },
    pills: {
      active: 'bg-primary text-white',
      inactive: 'text-gray-500 hover:bg-gray-100'
    },
    underline: {
      active: 'border-b-2 border-primary text-primary',
      inactive: 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }
  };

  return (
    <div className={className}>
      <div className={`flex ${variants[variant]}`}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium ${index === activeTab ? 
              tabVariants[variant].active : 
              tabVariants[variant].inactive
            } ${variant === 'pills' ? 'rounded-md' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;