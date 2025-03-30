import classNames from 'classnames';

const Table = ({
  columns = [],
  data = [],
  striped = false,
  hoverable = false,
  bordered = false,
  compact = false,
  className = ''
}) => {
  return (
    <div className="overflow-x-auto">
      <table className={classNames(
        'w-full',
        bordered ? 'border border-gray-200' : '',
        className
      )}>
        <thead>
          <tr className={classNames(
            'border-b border-gray-200',
            bordered ? 'bg-gray-50' : ''
          )}>
            {columns.map((column, index) => (
              <th
                key={index}
                className={classNames(
                  'text-left font-medium text-gray-500',
                  compact ? 'px-3 py-2 text-sm' : 'px-4 py-3',
                  column.align === 'right' ? 'text-right' : '',
                  column.align === 'center' ? 'text-center' : ''
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={classNames(
                hoverable ? 'hover:bg-gray-50' : '',
                striped && rowIndex % 2 === 0 ? 'bg-gray-50' : '',
                bordered ? 'border-b border-gray-200' : ''
              )}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={classNames(
                    compact ? 'px-3 py-2 text-sm' : 'px-4 py-3',
                    column.align === 'right' ? 'text-right' : '',
                    column.align === 'center' ? 'text-center' : ''
                  )}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;