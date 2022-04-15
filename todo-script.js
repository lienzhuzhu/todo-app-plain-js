// Implementation of ToDo app features
//


const apiKey = "96364a-276feb-952475-c85e9e-d6e333";

let inputForm = document.getElementById("add-item-form");
inputForm.addEventListener("submit", addItem);


// DISPLAY ITEM IN DOM
//
function displayItem(todoItem) {


    // only take in one todoItem
    // display that one item in DOM
    //
     
    
    // create item wrapper
    //
    let ItemDiv = document.createElement("div");
    ItemDiv.className = "todo-item-wrapper";
    ItemDiv.setAttribute("data-id", todoItem.id);

    // create text, checkbox, delete button for the item
    //
    let ItemText = document.createElement("p");
    ItemText.className = "item-text-class";
    ItemText.innerHTML = todoItem.text;

    let ItemBox = document.createElement("input");
    ItemBox.type = "checkbox";
    ItemBox.className = "complete-checkbox-class";
    ItemBox.setAttribute("data-id", todoItem.id);

    let ItemDelBtn = document.createElement("input");
    ItemDelBtn.type = "button";
    ItemDelBtn.className = "delete-button-class";
    ItemDelBtn.value = "delete";
    ItemDelBtn.setAttribute("data-id", todoItem.id);

    // append item wrapper to content div
    //
    let contentArea = document.getElementById("main-wrapper");
    contentArea.appendChild(ItemDiv);
    
    // append item wrapper children to item wrapper
    //
    ItemDiv.appendChild(ItemBox);
    ItemDiv.appendChild(ItemText);
    ItemDiv.appendChild(ItemDelBtn);

    addHandlers(todoItem);
}


// LOAD ITEMS FROM SERVER
//
function loadItems() {
    
    var loadX = new XMLHttpRequest();

    loadX.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var todos = JSON.parse(this.responseText);
            console.log(todos);

            // might need to clear each item out for reload
            //
            
            for (i = 0; i < todos.length; i++) {
                displayItem(todos[i]);
            }
           
        }
    };

    loadX.open("GET", "https://cse204.work/todos", true);
    loadX.setRequestHeader("x-api-key", apiKey);
    loadX.send();
}


// ADD EVENT LISTENERS FOR CHECKBOX AND DELETE BUTTONS
//
function addHandlers(todoItem) {

    let id = todoItem.id;

    let button = document.querySelector('[className="delete-button-class"][data-id=id]');
    button.addEventListener("click", deleteItem);

    let box = document.querySelector('[className="complete-checkbox-class"][data-id=id]');

    box.addEventListener("click", setComplete);
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
            let contentDiv = document.getElementById("main-wrapper");
            let deleteDiv = document.querySelector('[className="todo-item-wrapper"][data-id=id]');

            contentDiv.remove(deleteDiv);

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


loadItems();



// // strikethrough complete items
// //
// if (item.completed == true) {
//     ItemText.style.textDecoration = "line-through";
// } else {
//     ItemText.style.textDecoration = "none";
// }


// // SET COMPLETE STATUS ON CHECKBOX CLICK
// //
// function setComplete() {

//     let id = this.getAttribute("data-id");

//     if (this.checked) {
//         var data = {
//             "completed": true
//         }
//     } else {
//         var data = {
//             "completed": false
//         }
//     }
    

//     // Initalize AJAX Request
//     var checkX = new XMLHttpRequest();

//     // Response handler
//     checkX.onreadystatechange = function() {

//         // Wait for readyState = 4 & 200 response
//         if (this.readyState == 4 && this.status == 200) {

//             // parse JSON response
//             var todo = JSON.parse(this.responseText);

//             // after updating item, clear the item from DOM
//             // then call displayItem() again
//             //


//         } else if (this.readyState == 4) {
//             // this.status !== 200, error from server
//             console.log(this.responseText);
//         }
//     }

//     checkX.open("PUT", "https://cse204.work/todos/"+id, true);

//     checkX.setRequestHeader("Content-type", "application/json");
//     checkX.setRequestHeader("x-api-key", apiKey);
//     checkX.send(JSON.stringify(data));
// }









    

