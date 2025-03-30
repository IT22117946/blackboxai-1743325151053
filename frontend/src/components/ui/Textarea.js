import classNames from 'classnames';
import { forwardRef } from 'react';

const Textarea = forwardRef(({
  variant = 'default',
  size = 'md',
  error = false,
  className = '',
  label,
  helperText,
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
      <textarea
        ref={ref}
        className={classNames(
          'block w-full rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50',
          variants[variant],
          sizes[size],
          {
            'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500': error,
            'border-gray-300': !error && variant !== 'unstyled' && variant !== 'flushed'
          }
        )}
        {...props}
      />
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

Textarea.displayName = 'Textarea';

export default Textarea;