import classNames from 'classnames';

const Avatar = ({
  src,
  alt = 'User avatar',
  size = 'md',
  rounded = 'full',
  className = '',
  status = null,
  onClick = null
}) => {
  const sizeClasses = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500'
  };

  return (
    <div 
      className={classNames(
        'relative inline-block',
        { 'cursor-pointer': onClick },
        className
      )}
      onClick={onClick}
    >
      <img
        src={src || '/default-avatar.png'}
        alt={alt}
        className={classNames(
          'object-cover',
          sizeClasses[size],
          roundedClasses[rounded]
        )}
      />
      {status && (
        <span
          className={classNames(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
            statusClasses[status],
            {
              'h-2 w-2': size === 'xs',
              'h-2.5 w-2.5': size === 'sm',
              'h-3 w-3': size === 'md',
              'h-3.5 w-3.5': size === 'lg',
              'h-4 w-4': size === 'xl'
            }
          )}
        />
      )}
    </div>
  );
};

export default Avatar;