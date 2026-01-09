import React from 'react';
import { useTasks } from '../hooks/useTasks';
import '../styles/TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const { toggleTask } = useTasks();

  const handleToggle = async (taskId) => {
    await toggleTask(taskId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <p>No tasks found. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div 
          key={task._id} 
          className={`task-item ${task.completed ? 'completed' : ''}`}
        >
          <div className="task-content">
            <div className="task-header">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task._id)}
                className="task-checkbox"
              />
              <h3 className="task-title">{task.title}</h3>
            </div>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <div className="task-meta">
              <span className="task-date">
                Created: {formatDate(task.createdAt)}
              </span>
              {task.updatedAt !== task.createdAt && (
                <span className="task-date">
                  Updated: {formatDate(task.updatedAt)}
                </span>
              )}
            </div>
          </div>
          <div className="task-actions">
            <button
              onClick={() => onEdit(task)}
              className="btn-edit"
              title="Edit task"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="btn-delete"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
