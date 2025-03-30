import { useState } from 'react';
import axios from 'axios';

const CreatePostForm = ({ onNewPost }) => {
  const [description, setDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() && mediaFiles.length === 0) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('description', description);
      mediaFiles.forEach(file => {
        formData.append('mediaFiles', file);
      });

      const res = await axios.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onNewPost(res.data);
      setDescription('');
      setMediaFiles([]);
    } catch (err) {
      console.error('Failed to create post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="card mb-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share your skills or ask a question..."
            className="input-field min-h-[100px]"
          />

          <div className="flex items-center justify-between">
            <div>
              <label className="cursor-pointer text-primary hover:text-primary-dark">
                <span className="mr-2">Add media</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,video/*"
                />
              </label>
              {mediaFiles.length > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  {mediaFiles.length} file(s) selected
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-4 py-2"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;