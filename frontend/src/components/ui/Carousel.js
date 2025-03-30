import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

const Carousel = ({
  items,
  autoPlay = false,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex(prev => 
      prev === 0 ? items.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prev => 
      prev === items.length - 1 ? 0 : prev + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  return (
    <div className={classNames('relative overflow-hidden', className)}>
      <div className="relative h-full">
        {items.map((item, index) => (
          <div
            key={index}
            className={classNames(
              'absolute inset-0 transition-opacity duration-500',
              index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          >
            {item}
          </div>
        ))}
      </div>

      {showControls && items.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 focus:outline-none"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 focus:outline-none"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </>
      )}

      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={classNames(
                'h-2 w-2 rounded-full transition-all',
                index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;