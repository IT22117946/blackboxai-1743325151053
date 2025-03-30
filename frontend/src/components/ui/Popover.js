import { Fragment, useState, useRef } from 'react';
import { Popover as HeadlessPopover } from '@headlessui/react';
import { usePopper } from 'react-popper';

const Popover = ({
  button,
  children,
  placement = 'bottom-start',
  offset = [0, 8],
  className = ''
}) => {
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset
        }
      }
    ]
  });

  return (
    <HeadlessPopover className={classNames('relative', className)}>
      {({ open }) => (
        <>
          <HeadlessPopover.Button as={Fragment} ref={setReferenceElement}>
            {button}
          </HeadlessPopover.Button>

          <HeadlessPopover.Panel
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="z-50 w-max bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="p-2">
              {children}
            </div>
          </HeadlessPopover.Panel>
        </>
      )}
    </HeadlessPopover>
  );
};

export default Popover;