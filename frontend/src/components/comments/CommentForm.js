import { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId, onNewComment }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError('');
    try {
      const res = await axios.post('/comments', {
        postId,
        content
      });
      onNewComment(res.data);
      setContent('');
    } catch (err) {
      setError('Failed to add comment');
      console.error('Comment submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}
      <div className="flex space-x-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 input-field"
        />
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="btn-primary px-4"
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;