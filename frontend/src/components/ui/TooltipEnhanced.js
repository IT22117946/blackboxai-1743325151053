import { useState, useRef } from 'react';
import { usePopper } from 'react-popper';
import { motion, AnimatePresence } from 'framer-motion';

const TooltipEnhanced = ({
  content,
  children,
  placement = 'top',
  offset = [0, 8],
  showDelay = 100,
  hideDelay = 200,
  className = ''
}) => {
  const [visible, setVisible] = useState(false);
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
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8
        }
      }
    ]
  });

  let showTimeout;
  let hideTimeout;

  const handleMouseEnter = () => {
    clearTimeout(hideTimeout);
    showTimeout = setTimeout(() => setVisible(true), showDelay);
  };

  const handleMouseLeave = () => {
    clearTimeout(showTimeout);
    hideTimeout = setTimeout(() => setVisible(false), hideDelay);
  };

  return (
    <div className={className}>
      <div
        ref={setReferenceElement}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>

      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="z-50"
      >
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md shadow-lg"
            >
              {content}
              <div 
                className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -z-10"
                style={{
                  [placement.includes('top') ? 'bottom' : 'top']: '-4px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TooltipEnhanced;