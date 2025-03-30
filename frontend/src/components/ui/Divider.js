import classNames from 'classnames';

const Divider = ({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'gray-200',
  className = '',
  label,
  labelPosition = 'center'
}) => {
  const variants = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  };

  const labelPositions = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  if (orientation === 'horizontal') {
    return (
      <div className={classNames('relative', className)}>
        <div className={classNames(
          'absolute inset-0 flex items-center',
          label ? labelPositions[labelPosition] : ''
        )}>
          {label && (
            <span className="px-2 bg-white text-sm text-gray-500">
              {label}
            </span>
          )}
        </div>
        <div className={classNames(
          'border-t',
          variants[variant],
          `border-${color}`
        )} />
      </div>
    );
  }

  return (
    <div className={classNames(
      'border-l',
      variants[variant],
      `border-${color}`,
      'h-full',
      className
    )} />
  );
};

export default Divider;