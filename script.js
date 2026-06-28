const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
let dragElement = null;
// console.log(todo,progress,done)

const tasks = document.querySelectorAll(".task");

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        // console.log("dragging",e);
        dragElement = task;
    })
});


function addDragEventOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over")
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over")
    })
    column.addEventListener("dragover", (e) => {
        e.preventDefault(); // for telling browser that we can share individual elements to one another 
    })
    column.addEventListener("drop", (e) => {
        e.preventDefault();
        // console.log("drop to :",e)
        console.log("dropped", dragElement, column)
        column.appendChild(dragElement);
        column.classList.remove("hover-over")
    })
}            

addDragEventOnColumn(todo)
addDragEventOnColumn(progress)
addDragEventOnColumn(done)
