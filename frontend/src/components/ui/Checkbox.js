import classNames from 'classnames';
import { forwardRef } from 'react';

const Checkbox = forwardRef(({
  id,
  name,
  label,
  checked = false,
  onChange,
  disabled = false,
  error = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={classNames('flex items-center', className)}>
      <input
        ref={ref}
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={classNames(
          'h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary',
          {
            'border-red-300 text-red-500 focus:ring-red-500': error,
            'opacity-50 cursor-not-allowed': disabled
          }
        )}
        {...props}
      />
      {label && (
        <label 
          htmlFor={id}
          className={classNames(
            'ml-2 block text-sm text-gray-900',
            {
              'text-red-600': error,
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;