import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/posts/PostCard';
import CreatePostForm from '../components/posts/CreatePostForm';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/posts/feed');
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CreatePostForm onNewPost={handleNewPost} />
      
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No posts to display. Follow users to see their posts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;