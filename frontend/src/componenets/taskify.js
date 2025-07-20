import "./style.css";
let homepage = document.querySelector("#homepage");

const defaultTaskArr = [
  {
    id: 1,
    title: "Buy Groceries",
    description: "Milk, Eggs, Bread, and Vegetables from the nearby store.",
    category: "todo",
    urgency: "not-urgent",
    dueDate: "09-06-2025",
  },
  {
    id: 2,
    title: "Math Assignment",
    description: "Complete calculus exercises from chapter 5 before deadline.",
    category: "inProgress",
    urgency: "not-urgent",
    dueDate: "12-06-2025",
  },
  {
    id: 3,
    title: "Prepare Resume",
    description: "Update and polish resume for internship applications.",
    category: "todo",
    urgency: "urgent",
    dueDate: "10-06-2025",
  },
  {
    id: 4,
    title: "Project Submission",
    description: "Submit backend project for final evaluation in Cohort 3.",
    category: "finished",
    urgency: "urgent",
    dueDate: "06-06-2025",
  },
  {
    id: 5,
    title: "Doctor Appointment",
    description: "Annual health checkup at 10 AM, City Clinic.",
    category: "inProgress",
    urgency: "urgent",
    dueDate: "09-06-2025",
  },
  {
    id: 6,
    title: "Read Book",
    description: "Finish reading 'Atomic Habits' - 2 chapters remaining.",
    category: "todo",
    urgency: "not-urgent",
    dueDate: "15-06-2025",
  },
  {
    id: 7,
    title: "Clean Workspace",
    description: "Organize desk and declutter files for better focus.",
    category: "finished",
    urgency: "not-urgent",
    dueDate: "08-06-2025",
  },
];
if (!localStorage.getItem("taskArr")) {
  localStorage.setItem("taskArr", JSON.stringify(defaultTaskArr));
}
let taskArr = JSON.parse(localStorage.getItem("taskArr"));

function renderHomepage() {
  let navBar = renderNavBar();
  let categories = document.createElement("div");
  categories.id = "categories";

  let todo = renderTodoCat();
  let inProgress = renderInProgressCat();
  let finished = renderFinisedCat();

  categories.append(todo, inProgress, finished);

  homepage.append(navBar, categories);
}

function renderNavBar() {
  let navBar = document.createElement("nav");
  navBar.id = "navbar";
  let taskify = document.createElement("span");
  taskify.textContent = "Taskify.DO";

  navBar.appendChild(taskify);
  return navBar;
}

function renderTodoCat() {
  let todo = document.createElement("div");
  todo.classList.add("category");
  todo.id = "todo";

  let categoryTitle = document.createElement("h1");
  categoryTitle.innerHTML = "To Do";
  categoryTitle.classList.add("categoryTitle");

  todo.appendChild(categoryTitle);

  let addNewBtn = document.createElement("div");
  addNewBtn.innerHTML = "Add New";

  for (let i = 0; i < taskArr.length; i++) {
    if (taskArr[i].category === "todo") {
      let taskDiv = generateTaskDiv(i, taskArr[i]);

      todo.append(taskDiv);
    }
  }

  let addNew = buildAddNewBtn();
  todo.append(addNew);

  todo.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  todo.addEventListener("drop", (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");

    let taskId = parseInt(data.split("-")[1]);
    let task = taskArr.find((t) => t.id === taskId);
    if (task) {
      task.category = "todo";
      saveToLocalStorage();
    }

    homepage.replaceChildren();
    renderHomepage();
  });
  return todo;
}

function renderInProgressCat() {
  let inProgress = document.createElement("div");
  inProgress.classList.add("category");
  inProgress.id = "inProgress";

  let categoryTitle = document.createElement("h1");
  categoryTitle.innerHTML = "In Progress";
  categoryTitle.classList.add("categoryTitle");

  inProgress.appendChild(categoryTitle);

  let addNewBtn = document.createElement("div");
  addNewBtn.innerHTML = "Add New";

  for (let i = 0; i < taskArr.length; i++) {
    if (taskArr[i].category === "inProgress") {
      let taskDiv = generateTaskDiv(i, taskArr[i]);
      inProgress.append(taskDiv);
    }
  }

  let addNew = buildAddNewBtn();
  inProgress.append(addNew);

  inProgress.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  inProgress.addEventListener("drop", (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");

    let taskId = parseInt(data.split("-")[1]); // more robust than slice(8)
    let task = taskArr.find((t) => t.id === taskId);
    if (task) {
      task.category = "inProgress";
      saveToLocalStorage();
    }

    homepage.replaceChildren();
    renderHomepage();
  });

  return inProgress;
}

function renderFinisedCat() {
  let finished = document.createElement("div");
  finished.classList.add("category");
  finished.id = "finished";

  let categoryTitle = document.createElement("h1");
  categoryTitle.innerHTML = "Finished";
  categoryTitle.classList.add("categoryTitle");

  finished.appendChild(categoryTitle);

  let addNewBtn = document.createElement("div");
  addNewBtn.innerHTML = "Add New";

  for (let i = 0; i < taskArr.length; i++) {
    if (taskArr[i].category === "finished") {
      let taskDiv = generateTaskDiv(i, taskArr[i]);
      finished.append(taskDiv);
    }
  }

  let addNew = buildAddNewBtn();
  finished.append(addNew);

  finished.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  finished.addEventListener("drop", (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");

    let taskId = parseInt(data.split("-")[1]); // more robust than slice(8)
    let task = taskArr.find((t) => t.id === taskId);
    if (task) {
      task.category = "finished";
      saveToLocalStorage();
    }

    homepage.replaceChildren();
    renderHomepage();
  });

  return finished;
}

window.addEventListener("DOMContentLoaded", () => {
  renderHomepage();
});

// Add new button
function buildAddNewBtn() {
  let addNew = document.createElement("div");
  addNew.className = "addNew";
  addNew.type = "button";

  let addNewBtn = document.createElement("span");
  addNewBtn.textContent = "Add New";
  addNewBtn.id = "addNewBtn";

  let addImg = document.createElement("img");

  addImg.src =
    "https://img.icons8.com/?size=100&id=60953&format=png&color=000000";
  addImg.className = "addImg";

  addNew.append(addNewBtn, addImg);

  addNew.addEventListener("click", addingNewTask);
  return addNew;
}

function addingNewTask(event) {
  let category = event.target.closest(".category");
  let addNewDiv = event.target.closest(".addNew");

  let newTask = document.createElement("div");
  newTask.className = "newTaskDiv";

  let newTaskTitle = document.createElement("input");
  newTaskTitle.type = "text";
  newTaskTitle.classList.add("input", "newTaskTitle");

  newTaskTitle.placeholder = "Add Title";

  let newTaskDescription = document.createElement("textarea");
  newTaskDescription.placeholder = "Add Discription";
  newTaskDescription.classList.add("input", "newTaskDescription");

  let otherDetails = document.createElement("div");
  otherDetails.classList.add("otherDetails");

  let urgencyDiv = toggleUrgency2();

  let dueDate = document.createElement("input");
  dueDate.type = "date";
  dueDate.classList.add("dueDate");

  let saveImg = document.createElement("img");

  saveImg.src =
    "https://img.icons8.com/?size=100&id=82736&format=png&color=000000";
  saveImg.className = "saveImg";

  saveImg.addEventListener("click", saveTask);

  otherDetails.append(urgencyDiv, dueDate, saveImg);

  newTask.append(newTaskTitle, newTaskDescription, otherDetails);
  category.replaceChild(newTask, addNewDiv);
}

// Save Task
function saveTask(event) {
  let newTaskDiv = event.target.closest(".newTaskDiv").children;
  let otherDetails = event.target.parentElement.children;
  let category = event.target.closest(".category").id;

  let taskObj = {
    id: taskArr.length + 1,
    title: newTaskDiv[0].value,
    description: newTaskDiv[1].value,
    category: category,
    urgency: otherDetails[0].firstChild.textContent,
    dueDate: otherDetails[1].value,
  };

  taskArr.push(taskObj);
  saveToLocalStorage();

  homepage.replaceChildren();
  renderHomepage();
}
function toggleUrgency2() {
  let urgency = document.createElement("div");
  urgency.textContent = "urgent";
  urgency.classList.add("urgent", "urgency");

  urgency.addEventListener("click", (event) => {
    let urgency = event.target;

    if (urgency.textContent === "urgent") {
      urgency.textContent = "not-urgent";
      urgency.classList.remove("urgent");
      urgency.classList.add("not-urgent");
    } else {
      urgency.textContent = "urgent";
      urgency.classList.add("urgent");
      urgency.classList.remove("not-urgent");
    }
  });

  return urgency;
}

// Toggle Urgency
function toggleUrgency(event) {
  if (event.target.closest(".taskDiv") === null) {
    let taskId = parseInt(event.target.closest(".newTaskDiv").id.split("-")[1]);
  }

  let urgencyDiv = event.target;

  let taskId = parseInt(event.target.closest(".taskDiv").id.split("-")[1]);
  let id = taskArr.findIndex((ele) => ele.id === taskId);

  if (urgencyDiv.textContent === "urgent") {
    taskArr[id].urgency = "not-urgent";
  } else {
    taskArr[id].urgency = "urgent";
  }

  saveToLocalStorage();
  homepage.replaceChildren();
  renderHomepage();
}

function generateTaskDiv(idx, todoTask) {
  idx++;
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("taskDiv");
  taskDiv.id = "taskDiv-" + todoTask.id;
  taskDiv.draggable = true;

  let taskId = document.createElement("span");
  taskId.textContent = idx;
  taskId.style.display = "none";

  let taskTitle = document.createElement("span");
  taskTitle.textContent = todoTask.title;
  taskTitle.classList.add("taskTitle");

  let taskDescription = document.createElement("span");
  taskDescription.textContent = todoTask.description;
  taskDescription.classList.add("taskDescription");

  let taskCategory = document.createElement("span");
  taskCategory.textContent = todoTask.category;
  taskCategory.style.display = "none";

  let otherDetails = document.createElement("div");
  otherDetails.classList.add("otherDetails");

  let taskUrgency = document.createElement("div");
  taskUrgency.textContent = todoTask.urgency;

  if (todoTask.urgency === "urgent") {
    taskUrgency.classList.add("urgent", "urgency");
  } else {
    taskUrgency.classList.add("not-urgent", "urgency");
  }

  taskUrgency.addEventListener("click", toggleUrgency);

  let taskDueDate = document.createElement("span");
  taskDueDate.textContent = "Due Date: " + todoTask.dueDate;
  taskDueDate.classList.add("taskDueDate");

  let imgDiv = document.createElement("div");
  let deleteImg = document.createElement("img");
  deleteImg.src =
    "https://img.icons8.com/?size=100&id=Me0Cfu0sqzE3&format=png&color=000000";
  deleteImg.className = "deleteImg";
  imgDiv.className = "imgDiv";
  imgDiv.appendChild(deleteImg);

  deleteImg.addEventListener("click", deleteTask);

  otherDetails.append(taskUrgency, taskDueDate, imgDiv);

  taskDiv.append(
    taskId,
    taskTitle,
    taskDescription,
    taskCategory,
    otherDetails
  );
  taskDiv.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  });
  taskDiv.addEventListener("dragend", (event) => {});

  return taskDiv;
}

// Delete Task
function deleteTask(event) {
  let taskId =
    event.target.parentElement.parentElement.parentElement.id.slice(8);

  let id = taskArr.findIndex((ele) => ele.id === Number(taskId));

  if (id === -1) {
    console.error("Task not found!");
    return;
  }
  if (id !== -1) {
    taskArr.splice(id, 1);
    saveToLocalStorage();

    homepage.replaceChildren();
    renderHomepage();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("taskArr", JSON.stringify(taskArr));
}
