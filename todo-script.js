// Implementation of ToDo app features
//


const apiKey = "96364a-276feb-952475-c85e9e-d6e333";

let inputForm = document.getElementById("add-item-form");

loadPage();



// helper method that clears page to prevent duplicate item displays
//
function clearPage() {

    let contentArea = document.getElementById("main-wrapper");
    let currItems = document.getElementsByClassName("todo-item-wrapper");

    for (i = 0; i < currItems.length; i++) {
        contentArea.removeChild(currItems[i]);
    }
}



// function that loads todo items into dom elements
//
function loadPage() {

    console.log("start of loadPage()");


    // clear page to prevent duplicate display by calling clearPage()
    //
    clearPage();
    
    console.log("page cleared");
    
    var loadX = new XMLHttpRequest();

    loadX.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var todos = JSON.parse(this.responseText);
            
            // for each item in todos {
            //      make some html elements with data attributes with value of the id
            //      add to dom
            //      if (complete == true) {
            //          style with strikethrough
            //      }
            //  }
            
            for (i = 0; i < todos.length; i++) {

                let item = todos[i];

                // print debug
                //
                console.log(item.text + " is being displayed");

                let ItemDiv = document.createElement("div");
                ItemDiv.className = "todo-item-wrapper";
                ItemDiv.setAttribute("data-id", item.id);

                let ItemText = document.createElement("p");
                ItemText.className = "item-text-class";
                ItemText.innerHTML = item.text;

                // strikethrough complete items
                //
                if (item.complete == true) {
                    ItemText.style.textDecoration = "line-through";
                } else {
                    ItemText.style.textDecoration = "none";
                }

                let ItemBox = document.createElement("input");
                ItemBox.type = "checkbox";
                ItemBox.className = "complete-checkbox-class";
                ItemBox.setAttribute("data-id", item.id);

                let ItemDelBtn = document.createElement("input");
                ItemDelBtn.type = "button";
                ItemDelBtn.className = "delete-button-class";
                ItemDelBtn.value = "delete";
                ItemDelBtn.setAttribute("data-id", item.id);
                ItemDelBtn.addEventListener("click", deleteItem);

                let contentArea = document.getElementById("main-wrapper");
                contentArea.appendChild(ItemDiv);
                
                ItemDiv.appendChild(ItemBox);
                ItemDiv.appendChild(ItemText);
                ItemDiv.appendChild(ItemDelBtn);
            }


            // print debug
            //
            console.log("end of loadPage()");
        }
    };

    loadX.open("GET", "https://cse204.work/todos", true);
    loadX.setRequestHeader("x-api-key", apiKey);
    loadX.send();
}



// add a todo item
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

            // after adding item, call loadPage()
            // 
            loadPage();

            // print debug
            //
            console.log("a todo was added: " + todo.text);

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

inputForm.addEventListener("submit", addItem);



// set complete status on checkbox click
//
function setComplete() {

}




// request to delete an item
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

            loadPage();

            // print debug
            //
            console.log(id + " was deleted");

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






    

