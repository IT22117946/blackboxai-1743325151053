import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/posts/PostCard';
import CommentForm from '../components/comments/CommentForm';
import CommentSection from '../components/posts/CommentSection';
import { useAuth } from '../contexts/AuthContext';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error('Failed to fetch post:', err);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleNewComment = (newComment) => {
    setPost(prev => ({
      ...prev,
      comments: [newComment, ...prev.comments]
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PostCard post={post} expanded />

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>
        {user && (
          <CommentForm 
            postId={post.id} 
            onNewComment={handleNewComment} 
          />
        )}
        <CommentSection 
          comments={post.comments} 
          postId={post.id} 
        />
      </div>
    </div>
  );
};

export default PostDetailPage;