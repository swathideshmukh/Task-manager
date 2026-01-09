import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../hooks/useTasks';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, loading, error, fetchTasks, deleteTask } = useTasks();
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    fetchTasks(newFilter === 'all' ? '' : newFilter);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleTaskUpdated = () => {
    setEditingTask(null);
    fetchTasks(filter === 'all' ? '' : filter);
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  const filteredTasks = filter === 'all' 
    ? tasks 
    : filter === 'completed' 
    ? completedTasks 
    : pendingTasks;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}!</span>
            <button onClick={logout} className="btn-logout">Logout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="task-stats">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p className="stat-number">{tasks.length}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="stat-number completed">{completedTasks.length}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-number pending">{pendingTasks.length}</p>
          </div>
        </div>

        <div className="task-actions">
          <TaskForm 
            editingTask={editingTask} 
            onTaskUpdated={handleTaskUpdated}
            onCancel={handleCancelEdit}
          />
        </div>

        <div className="task-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Tasks ({tasks.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => handleFilterChange('pending')}
          >
            Pending ({pendingTasks.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => handleFilterChange('completed')}
          >
            Completed ({completedTasks.length})
          </button>
        </div>

        <div className="task-list-container">
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <TaskList 
              tasks={filteredTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
