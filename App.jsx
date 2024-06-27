import './App.css';
import { DndContext, closestCorners } from '@dnd-kit/core';
import Column from './components/Column/Column';
import { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import Input from './components/Input/Input';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'line1' },
    { id: 2, title: 'line2' },
    { id: 3, title: 'line3' },
  ]);

  const getTaskPos = (tasks, id) => {
    return tasks.findIndex((task) => task.id === id);
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    setTasks((tasks) => {
      const originalPos = getTaskPos(tasks, active.id);
      const newPos = getTaskPos(tasks, over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };
  const addTask = (title) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
  };
  return (
    <div className="App">
      <h1>My Tasks</h1>

      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Input onSubmit={addTask} />
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}
