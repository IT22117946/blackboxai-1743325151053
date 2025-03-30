import { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../components/users/UserCard';

const UserSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.trim() === '') {
        setUsers([]);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get('/users/search', {
          params: { q: searchQuery }
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to search users:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(searchUsers, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Find Users</h1>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input-field w-full pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {users.length > 0 ? (
            users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))
          ) : (
            <p className="text-center py-8 text-gray-500">
              {searchQuery ? 'No users found' : 'Search for users by name or email'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearchPage;