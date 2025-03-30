import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/posts/PostCard';
import LearningPlanCard from '../components/learning-plans/LearningPlanCard';

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [learningPlans, setLearningPlans] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [userRes, postsRes, plansRes] = await Promise.all([
          axios.get(`/users/${userId}`),
          axios.get(`/posts/user/${userId}`),
          axios.get(`/plans/user/${userId}`)
        ]);
        
        setUser(userRes.data);
        setPosts(postsRes.data);
        setLearningPlans(plansRes.data);
        setIsFollowing(userRes.data.isFollowing || false);
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [userId]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.delete(`/users/${userId}/follow`);
      } else {
        await axios.post(`/users/${userId}/follow`);
      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('Failed to update follow status:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <div className="flex items-start space-x-6">
          <img
            src={user.profilePicture || '/default-avatar.png'}
            alt={user.name}
            className="h-24 w-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <button
                onClick={handleFollow}
                className={`px-4 py-2 rounded-md ${isFollowing ? 'bg-gray-200 text-gray-800' : 'btn-primary'}`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
            <p className="mt-2 text-gray-600">{user.bio || 'No bio yet'}</p>
            <div className="mt-4 flex space-x-6">
              <div>
                <span className="font-semibold">{user.followerCount}</span>
                <span className="text-gray-500 ml-1">Followers</span>
              </div>
              <div>
                <span className="font-semibold">{posts.length}</span>
                <span className="text-gray-500 ml-1">Posts</span>
              </div>
              <div>
                <span className="font-semibold">{learningPlans.length}</span>
                <span className="text-gray-500 ml-1">Learning Plans</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Posts</h2>
          {posts.length > 0 ? (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-gray-500">No posts yet</p>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Learning Plans</h2>
          {learningPlans.length > 0 ? (
            learningPlans.map(plan => (
              <LearningPlanCard key={plan.id} plan={plan} />
            ))
          ) : (
            <p className="text-gray-500">No learning plans yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;