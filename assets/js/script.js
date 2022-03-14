//access the element usng QuerySelector
var buttonEl = document.querySelector("#save-task");
//access tasks using QuerySelector
var tasksToDoEl = document.querySelector("#tasks-to-do");

//when button is clicked, create element, give it class task-item, text context and append to listItem
var createTaskHandler = function () {
  var listeItemEl = document.createElement("li");
  listeItemEl.className = "task-item";
  listeItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listeItemEl);
};
//using the variable for button, add event listener for "click", run the createTaskHandler function
buttonEl.addEventListener("click", createTaskHandler);
