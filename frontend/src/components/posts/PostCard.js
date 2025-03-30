import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CommentSection from './CommentSection';

const PostCard = ({ post }) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(post);

  const handleLike = async () => {
    try {
      await axios.post(`/posts/${post.id}/like`);
      setCurrentPost(prev => ({
        ...prev,
        likeCount: prev.likeCount + 1
      }));
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  return (
    <div className="card">
      <div className="flex items-start space-x-4">
        <Link to={`/profile/${post.user.id}`} className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={post.user.profilePicture || '/default-avatar.png'}
            alt={post.user.name}
          />
        </Link>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Link 
              to={`/profile/${post.user.id}`}
              className="font-medium text-gray-900 hover:text-primary"
            >
              {post.user.name}
            </Link>
            <span className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="mt-2 text-gray-700">{post.description}</p>
          
          {post.mediaUrls?.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {post.mediaUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Post media ${index}`}
                  className="rounded-lg object-cover h-48 w-full"
                />
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1 text-gray-500 hover:text-primary"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{currentPost.likeCount}</span>
            </button>
            <button 
              onClick={() => setCommentsVisible(!commentsVisible)}
              className="flex items-center space-x-1 text-gray-500 hover:text-primary"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{post.comments?.length || 0}</span>
            </button>
          </div>

          {commentsVisible && (
            <CommentSection postId={post.id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;