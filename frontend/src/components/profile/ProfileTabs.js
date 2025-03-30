import { NavLink, Outlet, useParams } from 'react-router-dom';

const ProfileTabs = () => {
  const { userId } = useParams();

  const tabs = [
    { name: 'Posts', path: '' },
    { name: 'Learning Plans', path: 'plans' },
    { name: 'Followers', path: 'followers' },
    { name: 'Following', path: 'following' }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              end
              className={({ isActive }) =>
                `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <Outlet />
    </div>
  );
};

export default ProfileTabs;