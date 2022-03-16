// Task ID counter is used to increment each time a task is added
var taskIdCounter = 0;
//access the element usng QuerySelector
var formEl = document.querySelector("#task-form");
//access tasks using QuerySelector
var tasksToDoEl = document.querySelector("#tasks-to-do");

//when button is clicked, create element, give it class task-item, text context and append to listItem
var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name = 'task-name']").value;
  var taskTypeInput = document.querySelector(
    "select[name = 'task-type']"
  ).value;
  // console.log(taskTypeInput);
  // console.log(taskNameInput);

  //check if input calues are empty string
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  // package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };
  //send it as an argument to createTaskEl
  createTaskEl(taskDataObj);

  formEl.reset();
};

var createTaskEl = function (taskDataObj) {
  //create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  //create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");

  //give div a class name
  taskInfoEl.className = "task-info";

  //add HTML content to the div
  taskInfoEl.innerHTML =
    "<h3 class = 'task-name'>" + taskDataObj.name + "</h3>";
  listItemEl.appendChild(taskInfoEl);

  //taskActionsEl
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);

  //add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  //increase task counter for next unique id
  taskIdCounter++;
};
var createTaskActions = function (taskId) {
  // create container
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  //create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  //create delete button

  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    //create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};
//using the variable for button, add event listener for "click", run the createTaskHandler function
formEl.addEventListener("submit", taskFormHandler);
