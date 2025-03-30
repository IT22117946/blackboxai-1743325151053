import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const UserCard = ({ user, showFollowButton = true, onFollowChange }) => {
  const { user: currentUser } = useAuth();

  const handleFollow = async () => {
    try {
      if (user.isFollowing) {
        await axios.delete(`/users/${user.id}/follow`);
      } else {
        await axios.post(`/users/${user.id}/follow`);
      }
      onFollowChange && onFollowChange(!user.isFollowing);
    } catch (err) {
      console.error('Failed to update follow status:', err);
    }
  };

  return (
    <div className="card flex items-center justify-between p-4">
      <Link to={`/profile/${user.id}`} className="flex items-center space-x-3 flex-1">
        <img
          src={user.profilePicture || '/default-avatar.png'}
          alt={user.name}
          className="h-12 w-12 rounded-full"
        />
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-1">
            {user.bio || 'No bio yet'}
          </p>
        </div>
      </Link>

      {showFollowButton && currentUser?.id !== user.id && (
        <button
          onClick={handleFollow}
          className={`px-3 py-1 rounded-md text-sm ${user.isFollowing ? 'bg-gray-200 text-gray-800' : 'btn-primary'}`}
        >
          {user.isFollowing ? 'Following' : 'Follow'}
        </button>
      )}
    </div>
  );
};

export default UserCard;