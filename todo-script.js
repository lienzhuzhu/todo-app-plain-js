// Implementation of ToDo app features
//


const apiKey = "96364a-276feb-952475-c85e9e-d6e333";

let inputForm = document.getElementById("add-item-form");
inputForm.addEventListener("submit", addItem);

loadItems();


// add eventlisteners to checkbox and delete buttons
//
function addHandlers() {
    let buttons = document.getElementsByClassName("delete-button-class");

    for (i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.addEventListener("click", deleteItem);
    }

    let checkboxes = document.getElementsByClassName("complete-checkbox-class");

    for (j = 0; j < checkboxes.length; j++) {
        let box = checkboxes[j];
        box.addEventListener("click", setComplete);
    }
}



// FROM DISCUSSION WITH PROF. CLAPP: 
//
// load items from server into array
// pass array into drawPage()
// add event listeners to each button in another method
//



// helper method that clears page to prevent duplicate item displays
//
function clearPage() {

    let contentArea = document.getElementById("main-wrapper");
    let currItems = document.getElementsByClassName("todo-item-wrapper");

    for (i = 0; i < currItems.length; i++) {
        contentArea.removeChild(currItems[i]);
    }

    console.log("page cleared");
}



// DISPLAY ALL ITEMS
//
function drawPage(itemsArr) {

    console.log("drawPage() called");

    // clear page to prevent duplicate display by calling clearPage()
    //
    clearPage();

    // iterate through each item in itemsArr
    // create dom elements
    // for each item in todos {
    //      make some html elements with data attributes with value of the id
    //      add to dom
    //      if (complete == true) {
    //          style with strikethrough
    //      }
    //  }
     
    for (i = 0; i < itemsArr.length; i++) {

        let item = itemsArr[i];

        // print debug
        //
        console.log(item.text + " is being displayed");
        console.log(item);

        let ItemDiv = document.createElement("div");
        ItemDiv.className = "todo-item-wrapper";
        ItemDiv.setAttribute("data-id", item.id);

        let ItemText = document.createElement("p");
        ItemText.className = "item-text-class";
        ItemText.innerHTML = item.text;

        // strikethrough complete items
        //
        if (item.completed == true) {
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

        // do this later
        //
        // ItemDelBtn.addEventListener("click", deleteItem);

        let contentArea = document.getElementById("main-wrapper");
        contentArea.appendChild(ItemDiv);
        
        ItemDiv.appendChild(ItemBox);
        ItemDiv.appendChild(ItemText);
        ItemDiv.appendChild(ItemDelBtn);
    }

    console.log("items drawn");

    addHandlers();
}


// LOAD ITEMS FROM SERVER
//
function loadItems() {

    console.log("start of loadItems()");
    
    var loadX = new XMLHttpRequest();

    loadX.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var todos = JSON.parse(this.responseText);
            

            drawPage(todos);


            // print debug
            //
            console.log("end of loadItems()");
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

            // after adding item, call loadItems()
            // 
            loadItems();

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





// SET COMPLETE STATUS ON CHECKBOX CLICK
//
function setComplete() {
    let id = this.getAttribute("data-id");

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

            // after updating item, call loadItems()
            // 
            loadItems();

            // print debug
            //
            console.log("a todo was added: " + todo.text);

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
            
            // after adding, load page
            //
            loadItems();

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






    

