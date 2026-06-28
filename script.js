let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const columns = [todo, progress, done];

let dragElement = null;

// -------------------------
// Create Task
// -------------------------
function createTask(title, desc) {

    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="delete-btn">Delete</button>
    `;

    // Drag
    div.addEventListener("dragstart", () => {
        dragElement = div;
    });

    // Delete
    div.querySelector(".delete-btn").addEventListener("click", () => {
        div.remove();
        updateTaskCount();
    });

    return div;
}

// -------------------------
// Update Count + Save
// -------------------------
function updateTaskCount() {

    columns.forEach(col => {

        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".heading .right");

        count.innerText = tasks.length;

        tasksData[col.id] = Array.from(tasks).map(task => ({
            title: task.querySelector("h2").innerText,
            desc: task.querySelector("p").innerText
        }));

    });

    localStorage.setItem("task", JSON.stringify(tasksData));
}

// -------------------------
// Render Tasks
// -------------------------
function renderTasks() {

    // Remove old tasks
    columns.forEach(col => {
        col.querySelectorAll(".task").forEach(task => task.remove());
    });

    columns.forEach(col => {

        const data = tasksData[col.id] || [];

        data.forEach(task => {

            const taskDiv = createTask(task.title, task.desc);

            col.appendChild(taskDiv);

        });

    });

    updateTaskCount();
}

// -------------------------
// Drag Events
// -------------------------
function addDragEventOnColumn(column) {

    column.addEventListener("dragenter", e => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", e => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", e => {
        e.preventDefault();
    });

    column.addEventListener("drop", e => {

        e.preventDefault();

        if (dragElement) {
            column.appendChild(dragElement);
        }

        column.classList.remove("hover-over");

        updateTaskCount();

    });

}

columns.forEach(addDragEventOnColumn);

// -------------------------
// Modal
// -------------------------
const toggleModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addTaskButton = document.querySelector("#add-new-task");

toggleModalButton.addEventListener("click", () => {
    modal.classList.add("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

// -------------------------
// Add Task
// -------------------------
addTaskButton.addEventListener("click", () => {

    const titleInput = document.querySelector("#task-title-input");
    const descInput = document.querySelector("#task-desc-input");

    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (title === "") {
        alert("Please enter a task title.");
        return;
    }

    const task = createTask(title, desc);

    todo.appendChild(task);

    updateTaskCount();

    titleInput.value = "";
    descInput.value = "";

    modal.classList.remove("active");

});

// -------------------------
// Load Local Storage
// -------------------------
const savedTasks = JSON.parse(localStorage.getItem("task"));

if (savedTasks) {
    tasksData = savedTasks;
    renderTasks();
} else {
    updateTaskCount();
}