# contain main roots and endpoints

# localhost:5000/home -> home = endpoint

# request -> anything we send to server 
# - types
# - : GET -> trying to access some type of resource
# - : POST -> create something new
# - : PUT / PATCH -> update something
# - : DELETE
# - json
# response
# - status -> let us know what happened


#create
# - task 
# - due date
# - priority
# - status

from flask import request, jsonify
from config import app, db
from models import Task

@app.route("/tasks", methods=["GET"]) #decore
def get_tasks():
    tasks = Task.query.all()
    json_tasks = list(map(lambda x: x.to_json(), tasks))
    return jsonify({"tasks": json_tasks})

@app.route("/create_task", methods=["POST"])
def create_task():
    taskName = request.json.get("taskName")
    dueDate = request.json.get("dueDate")
    priority = request.json.get("priority")
    status = request.json.get("status")

    if not taskName or not dueDate or not priority or not status:
        return (
            jsonify({"message": "You must include a task name, due date, priority, or status"}),
        400,
    )

    new_task = Task(taskName = taskName, dueDate = dueDate, priority = priority, status = status)
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Task created!"}), 201

@app.route("/update_task/<int:task_id>", methods=["PATCH"])
def update_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return jsonify({"message": "Task not found"}), 404
    
    data = request.json
    task.taskName = data.get("taskName", task.taskName)
    task.dueDate = data.get("dueDate", task.dueDate)
    task.priority = data.get("priority", task.priority)
    task.status = data.get("status", task.status)

    db.session.commit()

    return jsonify({"message": "Task updated"}), 200

@app.route("/delete_task/<int:task_id>", methods = ["DELETE"])
def delete_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return jsonify({"message": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted"}), 200

if __name__ == "__main__":
    # do we already have a database? if not create.
    with app.app_context():
        db.create_all()

    app.run(debug=True)