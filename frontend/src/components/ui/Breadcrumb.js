import { ChevronRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const Breadcrumb = ({ 
  items,
  separator = 'chevron',
  className = ''
}) => {
  const separators = {
    chevron: <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />,
    slash: <span className="text-gray-400 mx-2">/</span>,
    arrow: <span className="text-gray-400 mx-2">→</span>
  };

  return (
    <nav className={classNames('flex items-center', className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && separators[separator]}
          {item.href ? (
            <Link href={item.href}>
              <a className={classNames(
                'text-sm font-medium',
                index === items.length - 1 
                  ? 'text-gray-600' 
                  : 'text-primary hover:text-primary-dark'
              )}>
                {item.label}
              </a>
            </Link>
          ) : (
            <span className="text-sm font-medium text-gray-600">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;