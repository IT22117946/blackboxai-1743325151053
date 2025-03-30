import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('/notifications');
        setNotifications(res.data);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [user]);

  const markAsRead = async (id) => {
    try {
      await axios.post(`/notifications/${id}/read`);
      setNotifications(prev => 
        prev.map(n => 
          n.id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.length === 0 ? (
        <p className="text-center py-4 text-gray-500">No notifications</p>
      ) : (
        notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`p-4 rounded-lg ${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 h-2 w-2 mt-1.5 rounded-full ${notification.isRead ? 'bg-gray-300' : 'bg-primary'}`}></div>
              <div className="flex-1">
                <p className="text-sm">{notification.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationList;