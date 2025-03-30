import classNames from 'classnames';

const Skeleton = ({
  variant = 'text',
  width = 'full',
  height = 'auto',
  className = '',
  count = 1
}) => {
  const variants = {
    text: 'rounded',
    circle: 'rounded-full',
    rect: 'rounded-none'
  };

  const widths = {
    full: 'w-full',
    xs: 'w-20',
    sm: 'w-32',
    md: 'w-48',
    lg: 'w-64',
    xl: 'w-96'
  };

  const heights = {
    auto: 'h-auto',
    xs: 'h-4',
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
    xl: 'h-16'
  };

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={classNames(
            'animate-pulse bg-gray-200',
            variants[variant],
            widths[width],
            heights[height],
            className
          )}
        />
      ))}
    </>
  );
};

export default Skeleton;