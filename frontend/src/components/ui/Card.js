import classNames from 'classnames';

const Card = ({
  children,
  variant = 'default',
  className = '',
  hoverEffect = false
}) => {
  const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-sm',
    filled: 'bg-gray-50',
    outline: 'border border-gray-200'
  };

  return (
    <div
      className={classNames(
        'rounded-lg overflow-hidden',
        variants[variant],
        {
          'transition-all duration-200 hover:shadow-md': hoverEffect && variant !== 'elevated',
          'hover:shadow-lg': hoverEffect && variant === 'elevated'
        },
        className
      )}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={classNames('px-6 py-4 border-b border-gray-200', className)}>
    {children}
  </div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={classNames('p-6', className)}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={classNames('px-6 py-4 border-t border-gray-200', className)}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;