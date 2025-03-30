import classNames from 'classnames';
import { forwardRef } from 'react';

const Switch = forwardRef(({
  id,
  name,
  checked = false,
  onChange,
  disabled = false,
  label,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={classNames('flex items-center', className)}>
      <button
        ref={ref}
        type="button"
        id={id}
        name={name}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={classNames(
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          {
            'bg-primary': checked && !disabled,
            'bg-gray-200': !checked && !disabled,
            'bg-primary/50': checked && disabled,
            'bg-gray-200/50': !checked && disabled,
            'cursor-not-allowed': disabled
          }
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={classNames(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            {
              'translate-x-5': checked,
              'translate-x-0': !checked
            }
          )}
        />
      </button>
      {label && (
        <label 
          htmlFor={id}
          className={classNames(
            'ml-3 block text-sm font-medium text-gray-700',
            {
              'opacity-50 cursor-not-allowed': disabled
            }
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Switch.displayName = 'Switch';

export default Switch;