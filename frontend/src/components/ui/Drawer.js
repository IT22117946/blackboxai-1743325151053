import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

const Drawer = ({
  isOpen,
  onClose,
  position = 'right',
  title,
  children,
  className = ''
}) => {
  const positions = {
    right: 'inset-y-0 right-0',
    left: 'inset-y-0 left-0',
    top: 'inset-x-0 top-0',
    bottom: 'inset-x-0 bottom-0'
  };

  const sizes = {
    right: 'h-full w-full sm:max-w-md',
    left: 'h-full w-full sm:max-w-md',
    top: 'w-full max-h-screen',
    bottom: 'w-full max-h-screen'
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-50"
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className={classNames(
            'fixed',
            positions[position],
            'pointer-events-none'
          )}>
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300 sm:duration-500"
              enterFrom={
                position === 'right' ? 'translate-x-full' :
                position === 'left' ? '-translate-x-full' :
                position === 'top' ? '-translate-y-full' : 'translate-y-full'
              }
              enterTo={
                position === 'right' || position === 'left' ? 'translate-x-0' :
                position === 'top' || position === 'bottom' ? 'translate-y-0' : ''
              }
              leave="transform transition ease-in-out duration-300 sm:duration-500"
              leaveFrom={
                position === 'right' || position === 'left' ? 'translate-x-0' :
                position === 'top' || position === 'bottom' ? 'translate-y-0' : ''
              }
              leaveTo={
                position === 'right' ? 'translate-x-full' :
                position === 'left' ? '-translate-x-full' :
                position === 'top' ? '-translate-y-full' : 'translate-y-full'
              }
            >
              <div className={classNames(
                'pointer-events-auto relative',
                sizes[position],
                'bg-white shadow-xl',
                className
              )}>
                <div className="flex flex-col h-full">
                  {title && (
                    <div className="px-4 py-6 sm:px-6 border-b border-gray-200">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {title}
                        </Dialog.Title>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={onClose}
                        >
                          <XIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="flex-1 overflow-y-auto">
                    {children}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer;