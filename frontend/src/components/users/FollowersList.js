import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserCard from './UserCard';

const FollowersList = () => {
  const { userId } = useParams();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const res = await axios.get(`/users/${userId}/followers`);
        setFollowers(res.data);
      } catch (err) {
        console.error('Failed to fetch followers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowers();
  }, [userId]);

  const handleFollowChange = (index, isFollowing) => {
    setFollowers(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        isFollowing
      };
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {followers.length > 0 ? (
        followers.map((follower, index) => (
          <UserCard
            key={follower.id}
            user={follower}
            onFollowChange={(isFollowing) => handleFollowChange(index, isFollowing)}
          />
        ))
      ) : (
        <p className="text-center py-8 text-gray-500">No followers yet</p>
      )}
    </div>
  );
};

export default FollowersList;