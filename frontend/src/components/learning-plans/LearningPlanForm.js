import { useState } from 'react';
import axios from 'axios';

const LearningPlanForm = ({ initialData = {}, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    resources: initialData.resources || {},
    timeline: initialData.timeline || {}
  });
  const [newResource, setNewResource] = useState({ name: '', url: '' });
  const [newMilestone, setNewMilestone] = useState({ name: '', date: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const endpoint = initialData.id 
        ? `/plans/${initialData.id}`
        : '/plans';
      const method = initialData.id ? 'put' : 'post';
      
      const res = await axios[method](endpoint, formData);
      onSuccess(res.data);
    } catch (err) {
      console.error('Failed to save learning plan:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addResource = () => {
    if (newResource.name && newResource.url) {
      setFormData(prev => ({
        ...prev,
        resources: {
          ...prev.resources,
          [newResource.name]: newResource.url
        }
      }));
      setNewResource({ name: '', url: '' });
    }
  };

  const removeResource = (name) => {
    const newResources = { ...formData.resources };
    delete newResources[name];
    setFormData(prev => ({
      ...prev,
      resources: newResources
    }));
  };

  const addMilestone = () => {
    if (newMilestone.name && newMilestone.date) {
      setFormData(prev => ({
        ...prev,
        timeline: {
          ...prev.timeline,
          [newMilestone.name]: newMilestone.date
        }
      }));
      setNewMilestone({ name: '', date: '' });
    }
  };

  const removeMilestone = (name) => {
    const newTimeline = { ...formData.timeline };
    delete newTimeline[name];
    setFormData(prev => ({
      ...prev,
      timeline: newTimeline
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="input-field"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="input-field min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Resources</label>
          <div className="mt-1 flex space-x-2">
            <input
              type="text"
              placeholder="Resource name"
              value={newResource.name}
              onChange={(e) => setNewResource({...newResource, name: e.target.value})}
              className="flex-1 input-field"
            />
            <input
              type="url"
              placeholder="URL"
              value={newResource.url}
              onChange={(e) => setNewResource({...newResource, url: e.target.value})}
              className="flex-1 input-field"
            />
            <button
              type="button"
              onClick={addResource}
              className="btn-secondary px-3"
            >
              Add
            </button>
          </div>
        </div>

        {Object.entries(formData.resources).length > 0 && (
          <div className="border rounded-md divide-y">
            {Object.entries(formData.resources).map(([name, url]) => (
              <div key={name} className="flex justify-between items-center p-2">
                <div>
                  <span className="font-medium">{name}: </span>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {url}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => removeResource(name)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Timeline</label>
          <div className="mt-1 flex space-x-2">
            <input
              type="text"
              placeholder="Milestone"
              value={newMilestone.name}
              onChange={(e) => setNewMilestone({...newMilestone, name: e.target.value})}
              className="flex-1 input-field"
            />
            <input
              type="date"
              value={newMilestone.date}
              onChange={(e) => setNewMilestone({...newMilestone, date: e.target.value})}
              className="flex-1 input-field"
            />
            <button
              type="button"
              onClick={addMilestone}
              className="btn-secondary px-3"
            >
              Add
            </button>
          </div>
        </div>

        {Object.entries(formData.timeline).length > 0 && (
          <div className="border rounded-md divide-y">
            {Object.entries(formData.timeline).map(([name, date]) => (
              <div key={name} className="flex justify-between items-center p-2">
                <div>
                  <span className="font-medium">{name}: </span>
                  <span>{new Date(date).toLocaleDateString()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeMilestone(name)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary px-6 py-2"
        >
          {isSubmitting ? 'Saving...' : 'Save Learning Plan'}
        </button>
      </div>
    </form>
  );
};

export default LearningPlanForm;