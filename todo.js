let todoItemscontainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton")
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoList() {
    let localStorageTodoList = localStorage.getItem("todoList");
    let parsedTodo = JSON.parse(localStorageTodoList);
    if (parsedTodo === null) {
        return [];
    } else {
        return parsedTodo;
    }
}
let todoList = getTodoList();

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function onTodoStatusChange(labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let todoObjectIndex = todoList.findIndex(function(eachItem) {
        let eachTodoId = "todo" + eachItem.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemscontainer.removeChild(todoElement);
    let delIndex = todoList.findIndex(function(item) {
        let eachTodoId = "todo" + item.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(delIndex, 1);
    console.log(todoList);
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;

    todoItemscontainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");

    todoElement.appendChild(inputElement);
    inputElement.onclick = function() {
        onTodoStatusChange(labelId, todoId);
    };


    let containerElement = document.createElement("div");
    containerElement.classList.add("d-flex", "flex-row", "label-container");

    todoElement.appendChild(containerElement);
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }

    containerElement.appendChild(labelElement);
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");

    containerElement.appendChild(deleteIconContainer);
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    }

    deleteIconContainer.appendChild(deleteIcon);
}
let todoCount = todoList.length;

function onAddTodo() {

    todoCount += 1;
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter valid Input");
        return;
    }
    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    };
    createAndAppendTodo(newTodo);
    todoList.push(newTodo);
    userInputElement.value = ""
}
addTodoButton.onclick = function() {
    onAddTodo();
}
for (let i of todoList) {
    createAndAppendTodo(i);
}