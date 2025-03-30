import classNames from 'classnames';
import { CheckIcon } from '@heroicons/react/solid';

const Stepper = ({
  steps,
  activeStep = 0,
  orientation = 'horizontal',
  className = ''
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <div className={classNames(
      isVertical ? 'space-y-4' : 'flex items-center justify-between',
      className
    )}>
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isCurrent = index === activeStep;
        const isUpcoming = index > activeStep;

        return (
          <div 
            key={index}
            className={classNames(
              'flex items-center',
              isVertical ? 'flex-col items-start' : 'flex-1'
            )}
          >
            <div className="flex items-center">
              <span className={classNames(
                'flex items-center justify-center h-8 w-8 rounded-full border-2',
                isCompleted ? 'bg-primary border-primary' : '',
                isCurrent ? 'border-primary' : '',
                isUpcoming ? 'border-gray-300' : ''
              )}>
                {isCompleted ? (
                  <CheckIcon className="h-5 w-5 text-white" />
                ) : (
                  <span className={classNames(
                    'text-sm font-medium',
                    isCurrent ? 'text-primary' : 'text-gray-500'
                  )}>
                    {index + 1}
                  </span>
                )}
              </span>
              <div className={classNames(
                'ml-3 text-sm font-medium',
                isCompleted ? 'text-primary' : '',
                isCurrent ? 'text-gray-900' : 'text-gray-500'
              )}>
                {step.label}
              </div>
            </div>
            {!isVertical && index < steps.length - 1 && (
              <div className={classNames(
                'hidden sm:block mx-4 h-0.5 flex-1',
                isCompleted ? 'bg-primary' : 'bg-gray-200'
              )} />
            )}
            {isVertical && index < steps.length - 1 && (
              <div className={classNames(
                'ml-4 h-8 w-0.5',
                isCompleted ? 'bg-primary' : 'bg-gray-200'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;