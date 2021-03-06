// Task ID counter is used to increment each time a task is added
var taskIdCounter = 0;
//access the element usng QuerySelector
var formEl = document.querySelector("#task-form");
//access tasks using QuerySelector (TODO)
var tasksToDoEl = document.querySelector("#tasks-to-do");
//access tasks in progress
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
//access tasks in completed
var tasksCompletedEl = document.querySelector("#tasks-completed");
//creating an array of objects
var tasks = [];

//Add main parent as event listener for click on Delete button
var pageContentEl = document.querySelector("#page-content");

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
  // var taskDataObj = {
  //   name: taskNameInput,
  //   type: taskTypeInput,
  // };
  //send it as an argument to createTaskEl
  // createTaskEl(taskDataObj);

  var isEdit = formEl.hasAttribute("data-task-id");

  // has data attribute, so get task id and call function which is complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  // no data attribute, so create object as normal and pass to createTaskEl Function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do",
    };
    // console.log(taskDataObj);
    // console.log(taskDataObj.status);
    createTaskEl(taskDataObj);
  }
};
var completeEditTask = function (taskName, taskType, taskId) {
  // console.log(taskName, taskType, taskId + " this is completed. CHECKED!");
  //find the matching task list item

  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  //set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  //loop through tasks array and task object with new content
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
    saveTasks();
  }

  alert("Task Updated!");

  //reset form and changing button text back to normal

  formEl.removeAttribute("data-task-id");
  //"add task" instead of "edit task!"
  document.querySelector("#save-task").textContent = "Add Task";
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
    "<h3 class = 'task-name'>" +
    taskDataObj.name +
    "</h3><span class = 'task-type'>" +
    taskDataObj.type +
    "</span>";
  listItemEl.appendChild(taskInfoEl);

  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);

  saveTasks();

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
//define deleteTask
var deleteTask = function (taskId) {
  // console.log(taskId);
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  // console.log(taskSelected);
  taskSelected.remove();

  // create new array to hold updated list of tasks

  var updatedTaskArr = [];
  //loop through current tasks

  for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task!
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }
  //reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;
  saveTasks();
};
var editTask = function (taskId) {
  // get task list item element
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;

  var taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name = 'task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  //save task!
  document.querySelector("#save-task").textContent = "Save Task";

  //addition of ID to edit task
  formEl.setAttribute("data-task-id", taskId);
};
var taskStatusChangeHandler = function (event) {
  // console.log(event.target, event.target.getAttribute("data-task-id"));

  //get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  //find the parent task item element based on the id

  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  //get the currently selected option's value and conver to lowercase [less bugs!]

  var statusValue = event.target.value.toLowerCase();

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
  //update task's in tasks array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  saveTasks();
};

var taskButtonHandler = function (event) {
  // console.log(event.target);
  var targetEl = event.target;
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } else if (targetEl.matches(".delete-btn")) {
    //get the element's task id
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

//saveTasks
var saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
var loadTasks = function () {
  tasks = localStorage.getItem("tasks");
  var savedTasks = localStorage.getItem("tasks");

  if (!savedTasks) {
    tasks = [];
    return false;
  }
  savedTasks = JSON.parse(savedTasks);
  //looping through savedTasks array
  for (var i = 0; i < savedTasks.length; i++) {
    //pass each task object into the 'createTaskEl() function
    createTaskEl(saveTasks[i]);
  }
};
//using the variable for button, add event listener for "click", run the createTaskHandler function
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
