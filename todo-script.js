// Implementation of ToDo app features
//


const apiKey = "96364a-276feb-952475-c85e9e-d6e333";

let inputForm = document.getElementById("add-item-form");
inputForm.addEventListener("submit", addItem);

loadItems();

// DISPLAY ITEM IN DOM
//
function displayItem(todoItem) {

    // create item wrapper
    //
    let ItemDiv = document.createElement("div");
    ItemDiv.className = "todo-item-wrapper";
    ItemDiv.setAttribute("data-id", todoItem.id);
    ItemDiv.setAttribute("id", todoItem.id);

    // create text, checkbox, delete button for the item
    //
    let ItemText = document.createElement("p");
    ItemText.className = "item-text-class";
    ItemText.innerHTML = todoItem.text;
    ItemText.setAttribute("id", "p-"+todoItem.id);

    let ItemBox = document.createElement("input");
    ItemBox.type = "checkbox";
    ItemBox.className = "complete-checkbox-class";
    ItemBox.setAttribute("data-id", todoItem.id);
    ItemBox.addEventListener("click", setComplete);

    // on refresh, need to set checkbox and completed again
    //
    if (todoItem.completed == true) {
        ItemText.style.textDecoration = "line-through";
        ItemBox.checked = true;
    } else {
        ItemText.style.textDecoration = "none";
        ItemBox.checked = false;
    }

    let ItemDelBtn = document.createElement("input");
    ItemDelBtn.type = "button";
    ItemDelBtn.className = "delete-button-class";
    ItemDelBtn.value = "delete";
    ItemDelBtn.setAttribute("data-id", todoItem.id);
    ItemDelBtn.addEventListener("click", deleteItem); //

    // append item wrapper to content div
    //
    let contentArea = document.getElementById("main-wrapper");
    contentArea.appendChild(ItemDiv);
    
    // append item wrapper children to item wrapper
    //
    ItemDiv.appendChild(ItemBox);
    ItemDiv.appendChild(ItemText);
    ItemDiv.appendChild(ItemDelBtn);

    // addHandlers(todoItem);
}


// LOAD ITEMS FROM SERVER
//
function loadItems() {
    
    var loadX = new XMLHttpRequest();

    loadX.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var todos = JSON.parse(this.responseText);
            console.log(todos);

            for (i = 0; i < todos.length; i++) {
                displayItem(todos[i]);
            }
           
        }
    };

    loadX.open("GET", "https://cse204.work/todos", true);
    loadX.setRequestHeader("x-api-key", apiKey);
    loadX.send();
}


// ADD TODO ITEM
//
function addItem(event) {
    event.preventDefault();

    // Setting variable for form input (get from HTML form)
    let itemText = document.getElementById("add-input").value;

    var data = {
        text: itemText
    }

    // Initalize AJAX Request
    var addX = new XMLHttpRequest();

    // Response handler
    addX.onreadystatechange = function() {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {

            // parse JSON response
            var todo = JSON.parse(this.responseText);

            // after adding item, displayItem()
            //
            displayItem(todo);

        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    }

    addX.open("POST", "https://cse204.work/todos", true);

    addX.setRequestHeader("Content-type", "application/json");
    addX.setRequestHeader("x-api-key", apiKey);
    addX.send(JSON.stringify(data));

    // clear input box
    //
    document.getElementById("add-input").value = "";
}


// DELETE ITEM
//
function deleteItem() {
    // Setting variable for form input (get from HTML form)
    let id = this.getAttribute("data-id");

    // Initalize AJAX Request
    var delX = new XMLHttpRequest();

    // Response handler
    delX.onreadystatechange = function() {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {
            
            // remove div that displays the item from main-wrapper 
            // if item successfully removed from server
            //
            let deleteDiv = document.getElementById(id);
        
            deleteDiv.remove();

            // loadItems();

        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    }

    delX.open("DELETE", "https://cse204.work/todos/"+id, true);

    delX.setRequestHeader("Content-type", "application/json");
    delX.setRequestHeader("x-api-key", "96364a-276feb-952475-c85e9e-d6e333");
    delX.send();
}


// SET COMPLETE STATUS ON CHECKBOX CLICK
//
function setComplete() {

    let id = this.getAttribute("data-id");
    let pTag = document.getElementById("p-"+id);

    if (this.checked) {
        var data = {
            "completed": true
        }
    } else {
        var data = {
            "completed": false
        }
    }
    

    // Initalize AJAX Request
    var checkX = new XMLHttpRequest();

    // Response handler
    checkX.onreadystatechange = function() {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {

            // parse JSON response
            var todo = JSON.parse(this.responseText);

            //strikethrough complete items
            //
            if (todo.completed == true) {
                pTag.style.textDecoration = "line-through";
            } else {
                pTag.style.textDecoration = "none";
            }


        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    }

    checkX.open("PUT", "https://cse204.work/todos/"+id, true);

    checkX.setRequestHeader("Content-type", "application/json");
    checkX.setRequestHeader("x-api-key", apiKey);
    checkX.send(JSON.stringify(data));
}









    

