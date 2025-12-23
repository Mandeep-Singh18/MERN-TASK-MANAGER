import { useEffect, useState } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: ''});

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      toast.error('Could not fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', formData);
      setFormData({ title: '', description: ''});
      fetchTasks();
      toast.success('Task added');
    } catch (err) {
      toast.error('Error adding task');
    }
  };

  const toggleComplete = async (id, completed) => {
    await API.put(`/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

  return (
    <div className="dashboard">
      <h1>My Tasks</h1>
      <form onSubmit={addTask}>
        <input 
          placeholder="Title" 
          value={formData.title} 
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
        />
        <input 
          placeholder="Description" 
          value={formData.description} 
          onChange={(e) => setFormData({...formData, description: e.target.value})} 
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <div onClick={() => handleToggle(task._id, task.completed)}>
              <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </h3>
              <p>{task.description}</p>
            </div>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;