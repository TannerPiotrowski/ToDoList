# contain database models
from config import db

class Task(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    taskName = db.Column(db.String(80), unique = False, nullable = False)
    dueDate = db.Column(db.String(80), unique = False, nullable = False)
    priority = db.Column(db.String(80), unique = False, nullable = False)
    status = db.Column(db.String(80), unique = False, nullable = False)

    def to_json(self):
        return {
            "id": self.id,
            "taskName": self.taskName,
            "dueDate": self.dueDate,
            "priority": self.priority,
            "status": self.status,
        }