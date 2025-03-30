import { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';

const Alert = ({
  variant = 'info',
  title,
  message,
  dismissible = false,
  className = '',
  onDismiss
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const variants = {
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      icon: 'text-blue-400'
    },
    success: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      icon: 'text-green-400'
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-800',
      icon: 'text-yellow-400'
    },
    danger: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      icon: 'text-red-400'
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div className={classNames(
      'rounded-md p-4',
      variants[variant].bg,
      className
    )}>
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon 
            className={classNames(
              'h-5 w-5',
              variants[variant].icon
            )}
          />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={classNames(
              'text-sm font-medium',
              variants[variant].text
            )}>
              {title}
            </h3>
          )}
          {message && (
            <div className={classNames(
              'mt-2 text-sm',
              variants[variant].text
            )}>
              {message}
            </div>
          )}
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <button
              onClick={handleDismiss}
              className={classNames(
                'inline-flex rounded-md focus:outline-none',
                variants[variant].bg
              )}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;