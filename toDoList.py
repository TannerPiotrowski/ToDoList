tasks = []

def listTasks():
    if not tasks:
        print("There are no tasks.")
    else:
        print("Current tasks:")
        #count = 1
        for index, task in enumerate(tasks):
            print(f"{index + 1}. {task}")


def addTask():
    task = input("Enter the task you wish to add: ")
    tasks.append(task)
    print(f"'{task}' has been added to your To-Do List!")
    #listTasks()

def deleteTask():
    listTasks()
    # user could enter an invalid task. try except statement would bulletproof this
    try:
        taskToDelete = int(input("Chose the task number you wish to delete: "))
        if taskToDelete - 1 >= 0 and taskToDelete - 1 < len(tasks):
            tasks.pop(taskToDelete - 1)
            print(f"Task #{taskToDelete} has been deleted")
        else:
            print(f"Task #{taskToDelete} was not found")

    except:
        print("Invalid input.")
    listTasks()

def completeTask(task):
    pass

def editTask(task):
    pass


if __name__ == '__main__':
    while True:
        print("\n")
        print("Select an option:")
        print("--------------------------------------------")
        print("1. Add a new task")
        print("2. Delete a task")
        print("3. Mark a task as complete")
        print("4. Edit a task")
        print("5. List tasks")
        print("6. Quit")
        print("--------------------------------------------")

        choice = input("Please enter your choice: ")
        print("\n")

        if(choice == "1"):
            print("You chose to add a new task.")
            addTask()
        elif(choice == "2"):
            print("You chose to delete a task.")
            deleteTask()
        elif(choice == "3"):
            print("You chose to mark a task as complete.")
            completeTask()
        elif(choice == "4"):
            print("You chose to edit a task.")
            editTask()
        elif(choice == "5"):
            print("You chose to list tasks.")
            listTasks()
        elif(choice == "6"):
            print("You chose to quit the application.")
            break
        else:
            print("Invalid choice. Please try again.")