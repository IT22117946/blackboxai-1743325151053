import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PasswordChangeForm from '../components/auth/PasswordChangeForm';
import EditProfileModal from '../components/profile/EditProfileModal';

const SettingsPage = () => {
  const { user } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Account Settings</h1>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={user?.profilePicture || '/default-avatar.png'}
              alt={user?.name}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="btn-secondary"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <PasswordChangeForm />
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Account Actions</h2>
        <div className="space-y-3">
          <button className="text-red-500 hover:text-red-700">
            Delete Account
          </button>
        </div>
      </div>

      {isProfileModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsProfileModalOpen(false)}
          onUpdate={(updatedUser) => {
            // Handle profile update if needed
            setIsProfileModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default SettingsPage;