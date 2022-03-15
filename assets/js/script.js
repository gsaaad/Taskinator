//access the element usng QuerySelector
var formEl = document.querySelector("#task-form");
//access tasks using QuerySelector
var tasksToDoEl = document.querySelector("#tasks-to-do");

//when button is clicked, create element, give it class task-item, text context and append to listItem
var createTaskHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name = 'task-name']").value;
  var taskTypeInput = document.querySelector(
    "select[name = 'task-type']"
  ).value;
  console.log(taskTypeInput);

  //create list item
  var listeItemEl = document.createElement("li");
  listeItemEl.className = "task-item";

  //create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");

  //give div a class name
  taskInfoEl.className = "task-info";

  //add HTML content to the div
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskNameInput +
    "</h3><span class='task-type'>" +
    taskTypeInput +
    "</span>";
  listeItemEl.appendChild(taskInfoEl);

  //add entire list item to list
  tasksToDoEl.appendChild(listeItemEl);
};
//using the variable for button, add event listener for "click", run the createTaskHandler function
formEl.addEventListener("submit", createTaskHandler);
