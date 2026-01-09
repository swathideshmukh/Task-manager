import React, { useState, useEffect } from 'react';
import { useTasks } from '../hooks/useTasks';
import '../styles/TaskForm.css';

const TaskForm = ({ editingTask, onTaskUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addTask, updateTask } = useTasks();

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || ''
      });
    } else {
      setFormData({
        title: '',
        description: ''
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.title.trim()) {
      setError('Task title is required');
      setLoading(false);
      return;
    }

    let result;
    if (editingTask) {
      result = await updateTask(editingTask._id, {
        title: formData.title.trim(),
        description: formData.description.trim()
      });
    } else {
      result = await addTask(
        formData.title.trim(),
        formData.description.trim()
      );
    }

    if (result.success) {
      setFormData({ title: '', description: '' });
      if (editingTask && onTaskUpdated) {
        onTaskUpdated();
      }
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '' });
    setError('');
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="task-form-container">
      <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title..."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description (optional)..."
            rows="3"
          />
        </div>
        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading} 
            className="btn-primary"
          >
            {loading 
              ? (editingTask ? 'Updating...' : 'Adding...') 
              : (editingTask ? 'Update Task' : 'Add Task')
            }
          </button>
          {editingTask && (
            <button 
              type="button" 
              onClick={handleCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
