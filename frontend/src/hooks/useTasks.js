import { useState, useEffect } from 'react';
import api from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async (status = '') => {
    try {
      setLoading(true);
      const response = await api.get('/api/tasks', {
        params: status ? { status } : {}
      });
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title, description = '') => {
    try {
      const response = await api.post('/api/tasks', { title, description });
      setTasks(prevTasks => [response.data, ...prevTasks]);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to add task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const response = await api.put(`/api/tasks/${taskId}`, updates);
      setTasks(prevTasks =>
        prevTasks.map(task => task._id === taskId ? response.data : task)
      );
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to update task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const toggleTask = async (taskId) => {
    try {
      const response = await api.patch(`/api/tasks/${taskId}/toggle`);
      setTasks(prevTasks =>
        prevTasks.map(task => task._id === taskId ? response.data : task)
      );
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to toggle task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/api/tasks/${taskId}`);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to delete task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    setError
  };
};
