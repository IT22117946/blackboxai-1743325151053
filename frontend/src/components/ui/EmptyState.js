import { Button } from './Button';

const EmptyState = ({ 
  icon,
  title = 'No items found',
  description = 'There are currently no items to display.',
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      {icon && (
        <div className="text-gray-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 max-w-md mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <Button
          onClick={onAction}
          variant="primary"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;