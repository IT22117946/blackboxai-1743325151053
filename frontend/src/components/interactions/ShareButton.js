import { useState } from 'react';
import axios from 'axios';

const ShareButton = ({ url, title, type = 'post', id }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // Track share in backend
      await axios.post(`/${type}s/${id}/share`);

      // Copy to clipboard
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to share:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isLoading}
      className="flex items-center space-x-1 text-gray-500 hover:text-primary"
      title={`Share this ${type}`}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {isCopied && <span className="text-xs">Copied!</span>}
    </button>
  );
};

export default ShareButton;