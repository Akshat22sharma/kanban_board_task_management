document.addEventListener("DOMContentLoaded", function () {
    const todoTasks = document.getElementById("todo-tasks");
    const doingTasks = document.getElementById("doing-tasks");
    const doneTasks = document.getElementById("done-tasks");
    const addTaskForm = document.getElementById("add-task-form");
    const taskForm = document.getElementById("task-form");
  
    // Fetch and display tasks
    async function fetchAndDisplayTasks() {
      try {
        // Mock tasks (replace this with your API call)
        const tasks = [
          { id: 1, title: "Task 1", description: "Description for Task 1", status: "todo" },
          { id: 2, title: "Task 2", description: "Description for Task 2", status: "doing" },
          { id: 3, title: "Task 3", description: "Description for Task 3", status: "done" },
        ];
  
        tasks.forEach((task) => {
          const taskCard = createTaskCard(task);
          updateColumn(taskCard, task.status);
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  
    function createTaskCard(task) {
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <button class="delete-btn">Delete</button>
      `;
  
      card.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));
      card.draggable = true;
  
      card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", task.id);
      });
  
      return card;
    }
  
    function updateColumn(taskCard, status) {
      switch (status) {
        case "todo":
          todoTasks.appendChild(taskCard);
          break;
        case "doing":
          doingTasks.appendChild(taskCard);
          break;
        case "done":
          doneTasks.appendChild(taskCard);
          break;
        default:
          console.error("Invalid status:", status);
      }
    }
  
    // Show/hide the add task form modal
    function toggleAddTaskForm() {
      addTaskForm.style.display = addTaskForm.style.display === "block" ? "none" : "block";
    }
  
    // Add a new task
    taskForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const title = document.getElementById("task-title").value;
      const description = document.getElementById("task-description").value;
  
      if (!title || !description) {
        alert("Please fill in both title and description.");
        return;
      }
  
      const newTask = {
        id: Date.now(),
        title,
        description,
        status: "todo",
      };
  
      const taskCard = createTaskCard(newTask);
      updateColumn(taskCard, newTask.status);
  
      toggleAddTaskForm();
    });
  
    // Delete a task
    function deleteTask(id) {
      const taskCard = document.getElementById(id);
      taskCard.remove();
    }
  
    fetchAndDisplayTasks();
  
    // Add event listener to show/hide the add task form
    const addTaskButton = document.getElementById("add-task-button");
    const closeButton = document.querySelector(".close");
  
    addTaskButton.addEventListener("click", toggleAddTaskForm);
    closeButton.addEventListener("click", toggleAddTaskForm);
  });
  
  