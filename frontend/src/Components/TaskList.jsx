import React, {useState} from "react"
import Switch from "./switch"
import "./TaskList.css"
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({tasks, updateTask, updateCallback}) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE",
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_task/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            }else{
                console.error("Failed to delete task")
            }
        } catch (error) {
            alet(error)
        }
    }

    const moveTask = async (id) => {
        try {
            const options = {
                method: "POST"
            }
            const response = await fetch(`http://127.0.0.1:5000/complete_task/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            }else{
                console.error("Failed to move task")
            }
        } catch (error) {
            alet(error)
        }
    }

    const [isToggled, setIsToggled] = useState(false);
    
    return (
        <div>
            <div className = "mainContainer"> {/*holder of all tasks*/} 
                <div className = "switchContainer">
                    <Switch rounded={true} isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
                </div>
                <div clasName="descriptor">
                    <h2>
                        <ul className="taskHeader">
                            <li></li>
                            <li>Task</li>
                            <li>Date</li>
                            <li>Priority</li>
                            <li>Status</li>
                            <li></li>
                        </ul>
                    </h2>
                </div>
                {tasks.map((task) => (
                    <div className = "individualTask"> {/*Individual task*/}
                        <h2 key = {task.id}>
                            <ul className="task">
                                <li><Checkbox icon={<RadioButtonUncheckedIcon fontSize="large"/>} checkedIcon={<TaskAltIcon fontSize="large"/>} /></li>
                                <li>{task.taskName}</li>
                                <li>{task.dueDate}</li>
                                <li>{task.priority}</li>
                                <li>{task.status}</li>
                                <li>
                                    <IconButton aria-label="delete" onClick={() => updateTask(task)}>
                                        <EditIcon fontSize="large"/>
                                    </IconButton>                     
                                    <IconButton aria-label="delete" onClick={() => onDelete(task.id)}>
                                        <DeleteIcon fontSize="large"/>
                                    </IconButton>
                                </li>
                            </ul>
                        </h2>
                    </div>
                ))}  
            </div>












            {/*
            <div class="taskHeaderContainer">
                <h2>
                    <ul class="taskHeaderList">
                        <li></li>
                        <li>Task Name</li>
                        <li>Due Date</li>
                        <li>Priority</li>
                        <li>Status</li>
                        <li>Actions</li>
                    </ul>
                </h2>
            </div>
            <div className="taskListContainer">
                {tasks.map((task) => (
                    <div class="taskHeaderContainer"> 
                        <h2 key = {task.id}>
                            <ul className="taskList">
                                <li><button className="completeButton" onClick={() => moveTask(task.id)}></button></li>
                                <li>{task.taskName}</li>
                                <li>{task.dueDate}</li>
                                <li>{task.priority}</li>
                                <li>{task.status}</li>
                                <li>
                                    <button className="actionButton" onClick={() => updateTask(task)}>Update</button>
                                    <button className="actionButton" onClick={() => onDelete(task.id)}>Delete</button>
                                </li>
                            </ul>
                        </h2>
                    </div>
                ))}
            </div>
            <h1>Complete:</h1>
            <table className="completedTaskList">
                    <tr>
                        <th></th>
                        <th>Task Name</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                <tbody>
                    {tasks.map((task) => (
                        <tr className="task" key = {task.id}>
                            <td><button className="completeButton" onClick={() => moveTask(task.id)}></button></td>
                            <td>{task.taskName}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.priority}</td>
                            <td>{task.status}</td>
                            <td>
                                <button className="actionButton" onClick={() => updateTask(task)}>Update</button>
                                <button className="actionButton" onClick={() => onDelete(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            */}
        </div>
    )
}

export default TaskList