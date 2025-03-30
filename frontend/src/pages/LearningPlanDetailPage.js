import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LearningPlanForm from '../components/learning-plans/LearningPlanForm';
import { useAuth } from '../contexts/AuthContext';

const LearningPlanDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plan, setPlan] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`/plans/${id}`);
        setPlan(res.data);
      } catch (err) {
        console.error('Failed to fetch learning plan:', err);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/plans/${id}`);
      navigate('/profile');
    } catch (err) {
      console.error('Failed to delete learning plan:', err);
    }
  };

  const handleUpdateSuccess = (updatedPlan) => {
    setPlan(updatedPlan);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{plan.title}</h1>
        {user?.id === plan.user.id && (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary px-3 py-1"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <LearningPlanForm 
          initialData={plan} 
          onSuccess={handleUpdateSuccess} 
        />
      ) : (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {plan.description || 'No description provided'}
            </p>
          </div>

          {Object.keys(plan.resources).length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold mb-2">Resources</h2>
              <ul className="space-y-2">
                {Object.entries(plan.resources).map(([name, url]) => (
                  <li key={name}>
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Object.keys(plan.timeline).length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold mb-2">Timeline</h2>
              <ul className="space-y-3">
                {Object.entries(plan.timeline).map(([milestone, date]) => (
                  <li key={milestone} className="flex justify-between">
                    <span className="font-medium">{milestone}</span>
                    <span className="text-gray-500">
                      {new Date(date).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LearningPlanDetailPage;