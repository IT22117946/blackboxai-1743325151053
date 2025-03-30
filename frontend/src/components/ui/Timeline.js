import classNames from 'classnames';

const Timeline = ({
  items = [],
  align = 'left',
  className = ''
}) => {
  return (
    <div className={classNames('timeline', className)}>
      {items.map((item, index) => (
        <div 
          key={index}
          className={classNames(
            'relative pb-8',
            index !== items.length - 1 ? '' : '',
            align === 'left' ? 'pl-6' : 'pr-6'
          )}
        >
          {index !== items.length - 1 && (
            <div
              className={classNames(
                'absolute top-4 h-full w-0.5',
                align === 'left' ? 'left-0' : 'right-0',
                'bg-gray-200'
              )}
            />
          )}
          <div className="relative flex items-start">
            <div
              className={classNames(
                'flex items-center justify-center h-8 w-8 rounded-full ring-8 ring-white',
                align === 'left' ? 'mr-3' : 'ml-3',
                item.color ? `bg-${item.color}-500` : 'bg-primary-500'
              )}
            >
              {item.icon || (
                <span className="text-white text-sm font-medium">
                  {index + 1}
                </span>
              )}
            </div>
            <div className={classNames(
              'flex-1 min-w-0',
              align === 'left' ? 'text-left' : 'text-right'
            )}>
              <div className="text-sm font-medium text-gray-900">
                {item.title}
              </div>
              <div className="text-sm text-gray-500">
                {item.date}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                {item.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;