import classNames from 'classnames';
import { XIcon } from '@heroicons/react/outline';

const Chip = ({
  label,
  variant = 'default',
  size = 'md',
  rounded = 'full',
  onDelete,
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  return (
    <div
      className={classNames(
        'inline-flex items-center font-medium',
        variants[variant],
        sizes[size],
        roundedStyles[rounded],
        className
      )}
      {...props}
    >
      {label}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-black/10"
        >
          <XIcon className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default Chip;