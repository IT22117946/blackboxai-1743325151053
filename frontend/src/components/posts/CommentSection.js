import { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/post/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post('/comments', {
        postId,
        content: newComment
      });
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  if (loading) {
    return (
      <div className="mt-4 flex justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 input-field"
        />
        <button type="submit" className="btn-primary px-3 py-1">
          Post
        </button>
      </form>

      <div className="space-y-3">
        {comments.map(comment => (
          <div key={comment.id} className="flex space-x-3">
            <img
              src={comment.user.profilePicture || '/default-avatar.png'}
              alt={comment.user.name}
              className="h-8 w-8 rounded-full"
            />
            <div className="flex-1">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="font-medium text-sm">{comment.user.name}</p>
                <p className="text-gray-800">{comment.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;