import { useState } from 'react';
import axios from 'axios';

const BookmarkButton = ({ 
  id, 
  type = 'post', 
  initialBookmarked = false,
  onBookmarkChange 
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmark = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (isBookmarked) {
        await axios.delete(`/${type}s/${id}/bookmark`);
      } else {
        await axios.post(`/${type}s/${id}/bookmark`);
      }
      setIsBookmarked(prev => !prev);
      onBookmarkChange && onBookmarkChange(!isBookmarked);
    } catch (err) {
      console.error(`Failed to ${isBookmarked ? 'remove bookmark' : 'bookmark'} ${type}:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleBookmark}
      disabled={isLoading}
      className={`${isBookmarked ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'}`}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this'}
    >
      <svg 
        className="h-5 w-5" 
        fill={isBookmarked ? "currentColor" : "none"} 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
        />
      </svg>
    </button>
  );
};

export default BookmarkButton;