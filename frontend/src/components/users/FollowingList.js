import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserCard from './UserCard';

const FollowingList = () => {
  const { userId } = useParams();
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await axios.get(`/users/${userId}/following`);
        setFollowing(res.data);
      } catch (err) {
        console.error('Failed to fetch following:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowing();
  }, [userId]);

  const handleFollowChange = (index, isFollowing) => {
    setFollowing(prev => {
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
      {following.length > 0 ? (
        following.map((user, index) => (
          <UserCard
            key={user.id}
            user={user}
            onFollowChange={(isFollowing) => handleFollowChange(index, isFollowing)}
          />
        ))
      ) : (
        <p className="text-center py-8 text-gray-500">Not following anyone yet</p>
      )}
    </div>
  );
};

export default FollowingList;