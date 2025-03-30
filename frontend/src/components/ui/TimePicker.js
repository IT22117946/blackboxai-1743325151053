import { forwardRef } from 'react';
import ReactTimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { ClockIcon } from '@heroicons/react/outline';

const TimePicker = forwardRef(({
  value,
  onChange,
  label,
  error,
  helperText,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <ReactTimePicker
          ref={ref}
          value={value}
          onChange={onChange}
          disableClock={true}
          className={classNames(
            'block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary pl-10',
            {
              'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500': error
            }
          )}
          {...props}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ClockIcon 
            className={classNames(
              'h-5 w-5',
              error ? 'text-red-400' : 'text-gray-400'
            )}
          />
        </div>
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

TimePicker.displayName = 'TimePicker';

export default TimePicker;