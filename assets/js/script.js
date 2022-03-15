//access the element usng QuerySelector
var formEl = document.querySelector("#task-form");
//access tasks using QuerySelector
var tasksToDoEl = document.querySelector("#tasks-to-do");

//when button is clicked, create element, give it class task-item, text context and append to listItem
var createTaskHandler = function (event) {
  event.preventDefault();
  var listeItemEl = document.createElement("li");
  listeItemEl.className = "task-item";
  listeItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listeItemEl);
};
//using the variable for button, add event listener for "click", run the createTaskHandler function
formEl.addEventListener("submit", createTaskHandler);
