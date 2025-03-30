import { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ 
  id, 
  type = 'post', 
  initialLiked = false, 
  initialLikeCount = 0,
  onLikeChange 
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (isLiked) {
        await axios.delete(`/${type}s/${id}/like`);
        setLikeCount(prev => prev - 1);
      } else {
        await axios.post(`/${type}s/${id}/like`);
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(prev => !prev);
      onLikeChange && onLikeChange(!isLiked);
    } catch (err) {
      console.error(`Failed to ${isLiked ? 'unlike' : 'like'} ${type}:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
    >
      <svg 
        className="h-5 w-5" 
        fill={isLiked ? "currentColor" : "none"} 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeButton;