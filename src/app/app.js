import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://6555c0d584b36e3a431e3eba.mockapi.io/listTugas'; 
const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post(API_URL, task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${https://6555c0d584b36e3a431e3eba.mockapi.io/listTugas}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.patch(`${https://6555c0d584b36e3a431e3eba.mockapi.io/listTugas}/${id}`, updatedTask);
      setTasks(tasks.map(task => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []); 

  return (
    <div>
      <h1>Todo List</h1>

      {loading && <p>Loading...</p>}

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.namaTugas}</strong> ({task.mataKuliah}) - Deadline: {new Date(task.dateLine).toLocaleDateString()}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => updateTask(task.id, { completed: !task.completed })}>Toggle Complete</button>
          </li>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const taskTitle = e.target.elements.taskTitle.value;
          const mataKuliah = e.target.elements.mataKuliah.value;
          const dateLine = e.target.elements.dateLine.value; // Format dateLine sesuai kebutuhan
          addTask({ namaTugas: taskTitle, mataKuliah, dateLine, completed: false });
        }}
      >
        <input type="text" name="taskTitle" placeholder="Nama Tugas..." />
        <input type="text" name="mataKuliah" placeholder="Mata Kuliah..." />
        <input type="date" name="dateLine" placeholder="Deadline..." />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TodoApp;
