import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchTimer = setTimeout(async () => {
      try {
        const res = await axios.get('/search', {
          params: { q: query }
        });
        setResults(res.data);
        setIsOpen(true);
      } catch (err) {
        console.error('Search failed:', err);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query]);

  const handleResultClick = (type, id) => {
    setIsOpen(false);
    setQuery('');
    if (type === 'user') {
      navigate(`/profile/${id}`);
    } else if (type === 'post') {
      navigate(`/posts/${id}`);
    } else if (type === 'plan') {
      navigate(`/plans/${id}`);
    }
  };

  return (
    <div className="relative max-w-md w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search users, posts, plans..."
          className="input-field w-full pl-10 pr-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-96 overflow-auto">
          {results.map((result) => (
            <div
              key={`${result.type}-${result.id}`}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleResultClick(result.type, result.id)}
            >
              <div className="flex items-center space-x-3">
                {result.type === 'user' && (
                  <img
                    src={result.profilePicture || '/default-avatar.png'}
                    alt={result.name}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium">{result.title || result.name}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {result.type} • {new Date(result.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;