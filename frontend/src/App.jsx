import { useState, useEffect } from 'react'
import TaskList from './TaskList'
import './App.css'
import TaskForm from './TaskForm'
import CompletedList from './CompletedList'

function App() {
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState({})

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/tasks");
      const data = await response.json();
      const sortedTasks = data.tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setTasks(sortedTasks);
      //console.log(sortedTasks); // debugging
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentTask({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    if (isModalOpen) return
    setCurrentTask(task)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchTasks()
  }

  return (
    <>
      <TaskList tasks={tasks} updateTask={openEditModal} updateCallback={onUpdate}/>
      <button className="taskButton" onClick={openCreateModal}>Create New Task</button>
      {isModalOpen && <div className = "modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <TaskForm existingTask={currentTask} updateCallback={onUpdate}/>
        </div>
      </div>
      }
      {/*<CompletedList complete={complete} updateTask={openEditModal} updateCallback={onUpdate}/>*/}
    </>
  );
}

export default App
