// Implementation of ToDo app features
//




let inputForm = document.getElementById("add-item-form");


let apiKey = "96364a-276feb-952475-c85e9e-d6e333";





// function that loads initial page
// no reloads will be used from here
// AJAX calls only to update content
// refreshing window should retain data
//
function loadPage() {
    var loadX = new XMLHttpRequest();

    loadX.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var todos = JSON.parse(this.responseText);
            // iterate through array and put all elements on page
            // maybe use logic in addItem() to put things in DOM
            //
            
            // for each item in todos:
            //      make some html elements with data attributes with value of the id
            //      add to dom
            //      if (complete == true) {
            //          style with strikethrough
            //      }





            console.log(todos);
        }
    };

    loadX.open("GET", "https://cse204.work/todos", true);
    loadX.setRequestHeader("x-api-key", apiKey);
    loadX.send();
}

loadPage();



// add a todo item
// bind to form submit
//
//
// CAN CALL loadPage()
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

            let newItemDiv = document.createElement("div");
            newItemDiv.class = "todo-item-wrapper";
            newItemDiv.setAttribute("data-id", todo.id);

            let newItemText = document.createElement("p");
            newItemText.innerHTML = todo.text;

            let newItemBox = document.createElement("input");
            newItemBox.type = "checkbox";
            newItemBox.setAttribute("data-id", todo.id);

            let newItemDelBtn = document.createElement("input");
            newItemDelBtn.type = "button";
            newItemDelBtn.value = "delete";
            newItemDelBtn.setAttribute("data-id", todo.id);

            let contentArea = document.getElementById("main-wrapper");
            contentArea.appendChild(newItemDiv);
            newItemDiv.appendChild(newItemText);
            newItemDiv.appendChild(newItemBox);
            newItemDiv.appendChild(newItemDelBtn);



            console.log(todo);

        } else if (this.readyState == 4) {

            // this.status !== 200, error from server
            console.log(this.responseText);

        }
    };

    addX.open("POST", "https://cse204.work/todos", true);

    addX.setRequestHeader("Content-type", "application/json");
    addX.setRequestHeader("x-api-key", apiKey);
    addX.send(JSON.stringify(data));

    document.getElementById("add-input").value = "";
}

inputForm.addEventListener("submit", addItem);








// request to delete an item
//

// Setting variable for form input (get from HTML form)
// let id = "48facf20-badf-11ec-b19e-ef11f1352405";

// // Initalize AJAX Request
// var loadX2 = new XMLHttpRequest();

// // Response handler
// loadX2.onreadystatechange = function() {

//     // Wait for readyState = 4 & 200 response
//     if (this.readyState == 4 && this.status == 200) {

//         console.log("deleted");

//     } else if (this.readyState == 4) {

//         // this.status !== 200, error from server
//         console.log(this.responseText);

//     }
// };

// loadX2.open("DELETE", "https://cse204.work/todos/"+id, true);

// loadX2.setRequestHeader("Content-type", "application/json");
// loadX2.setRequestHeader("x-api-key", "96364a-276feb-952475-c85e9e-d6e333");
// loadX2.send();

