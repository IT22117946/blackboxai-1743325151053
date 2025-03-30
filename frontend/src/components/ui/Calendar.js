import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';

const Calendar = ({
  events = [],
  onDateClick,
  className = ''
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const onDateSelect = (day) => {
    setSelectedDate(day);
    onDateClick?.(day);
  };

  const getEventsForDay = (day) => {
    return events.filter(event => 
      isSameDay(parseISO(event.date), day)
    );
  };

  return (
    <div className={classNames('bg-white rounded-lg shadow', className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <button
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 p-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}

        {daysInMonth.map((day, i) => {
          const dayEvents = getEventsForDay(day);
          return (
            <button
              key={i}
              onClick={() => onDateSelect(day)}
              className={classNames(
                'h-10 w-10 rounded-full mx-auto flex items-center justify-center',
                isSameDay(day, selectedDate) ? 'bg-primary-500 text-white' : '',
                !isSameDay(day, selectedDate) && isSameMonth(day, currentMonth) ? 'text-gray-900 hover:bg-gray-100' : '',
                !isSameMonth(day, currentMonth) ? 'text-gray-400' : ''
              )}
            >
              <div className="relative">
                {format(day, 'd')}
                {dayEvents.length > 0 && (
                  <span className={classNames(
                    'absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full',
                    isSameDay(day, selectedDate) ? 'bg-white' : 'bg-primary-500'
                  )} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="border-t p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="space-y-2">
            {getEventsForDay(selectedDate).length > 0 ? (
              getEventsForDay(selectedDate).map((event, i) => (
                <div key={i} className="text-sm p-2 bg-gray-50 rounded">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-gray-500">{event.time}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No events scheduled</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;