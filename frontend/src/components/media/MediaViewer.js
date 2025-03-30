import { useState } from 'react';
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

const MediaViewer = ({ media, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === media.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <XIcon className="h-8 w-8" />
      </button>

      {media.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 text-white hover:text-gray-300"
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>
      )}

      <div className="max-w-4xl max-h-screen p-4">
        {media[currentIndex].type.startsWith('image') ? (
          <img
            src={media[currentIndex].url}
            alt={`Media ${currentIndex + 1}`}
            className="max-h-screen max-w-full object-contain"
          />
        ) : (
          <video
            src={media[currentIndex].url}
            controls
            className="max-h-screen max-w-full"
            autoPlay
          />
        )}
      </div>

      {media.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 text-white hover:text-gray-300"
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      )}

      {media.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaViewer;