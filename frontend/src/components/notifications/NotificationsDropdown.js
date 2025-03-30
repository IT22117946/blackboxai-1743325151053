import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('/notifications');
        setNotifications(res.data);
        setUnreadCount(res.data.filter(n => !n.isRead).length);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };
    
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const markAsRead = async (id) => {
    try {
      await axios.post(`/notifications/${id}/read`);
      setNotifications(prev => 
        prev.map(n => 
          n.id === id ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount(prev => prev - 1);
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.post('/notifications/mark-all-read');
      setNotifications(prev => 
        prev.map(n => ({ ...n, isRead: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full relative hover:bg-gray-100"
      >
        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-50">
          <div className="py-1">
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h3 className="font-medium">Notifications</h3>
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary hover:underline"
              >
                Mark all as read
              </button>
            </div>

            {notifications.length === 0 ? (
              <p className="px-4 py-3 text-sm text-gray-500">No notifications</p>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => (
                  <Link
                    key={notification.id}
                    to={notification.link || '#'}
                    onClick={() => markAsRead(notification.id)}
                    className={`block px-4 py-3 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                  >
                    <p className="text-sm">{notification.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </Link>
                ))}
              </div>
            )}

            <div className="border-t px-4 py-2 text-center">
              <Link
                to="/notifications"
                className="text-sm text-primary hover:underline"
                onClick={() => setIsOpen(false)}
              >
                View all notifications
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;