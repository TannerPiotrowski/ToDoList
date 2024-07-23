import React from "react"

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
    
    return (
        <div>
            <h1>To-Do:</h1>
            <table className="taskList">
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
                        <tr key = {task.id}>
                            <td><button className="completeButton"></button></td>
                            <td>{task.taskName}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.priority}</td>
                            <td>{task.status}</td>
                            <td>
                                <button onClick={() => updateTask(task)}>Update</button>
                                <button onClick={() => onDelete(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TaskList