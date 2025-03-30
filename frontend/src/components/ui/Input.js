import classNames from 'classnames';
import { forwardRef } from 'react';

const Input = forwardRef(({
  type = 'text',
  variant = 'default',
  size = 'md',
  error = false,
  className = '',
  label,
  helperText,
  startIcon,
  endIcon,
  ...props
}, ref) => {
  const variants = {
    default: 'bg-white border-gray-300 focus:border-primary focus:ring-primary',
    filled: 'bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary',
    flushed: 'border-b border-gray-200 bg-transparent focus:border-primary rounded-none px-0',
    unstyled: 'border-none bg-transparent focus:ring-0 px-0'
  };

  const sizes = {
    sm: 'py-1.5 text-sm',
    md: 'py-2',
    lg: 'py-3 text-lg'
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {startIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={classNames(
            'block w-full rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50',
            variants[variant],
            sizes[size],
            {
              'pl-10': startIcon,
              'pr-10': endIcon,
              'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500': error,
              'border-gray-300': !error && variant !== 'unstyled' && variant !== 'flushed'
            }
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {endIcon}
          </div>
        )}
      </div>
      {helperText && (
        <p className={classNames(
          'mt-1 text-sm',
          error ? 'text-red-600' : 'text-gray-500'
        )}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;