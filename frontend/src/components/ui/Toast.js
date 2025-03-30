import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

const Toast = ({
  message,
  type = 'info',
  duration = 5000,
  onDismiss,
  className = ''
}) => {
  const [show, setShow] = useState(true);

  const types = {
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
    error: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      icon: 'text-red-400'
    }
  };

  const handleDismiss = () => {
    setShow(false);
    setTimeout(() => onDismiss?.(), 300); // Wait for animation to complete
  };

  // Auto-dismiss after duration
  useState(() => {
    const timer = setTimeout(handleDismiss, duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classNames(
        'max-w-sm w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden',
        types[type].bg,
        className
      )}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {/* Icon would go here */}
              <div className={classNames('h-5 w-5', types[type].icon)} />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className={classNames('text-sm font-medium', types[type].text)}>
                {message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={handleDismiss}
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Toast;