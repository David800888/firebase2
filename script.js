let usernameElement = document.querySelector("#username");
let messageElement = document.querySelector("#message");
let button = document.querySelector("#submitButton");
let messageContainer = document.querySelector("#allMessages");

// Set database object REFERENCE here:

let database = firebase.database().ref();

/**
 * Updates the database with the username and message.
 */
window.onload = function updateDB(event){
    event.preventDefault();
    let username = usernameElement.value;
    let message = messageElement.value;
    usernameElement.value = "";
    messageElement.value  = "";
    console.log(username + " : " + message);
    
    //Create a JSON object containung the username and message
    let value = {
        NAME: username,
        MESSAGE: message,
    }
    
    // Update database here
    database.push(value);
    
}

// set database "child_added" event listener here
database.on("child_added", addMessageToBoard);

function addMessageToBoard(rowData) {
    let row = rowData.val(); // returns an object just like the "value" we pushed
    let username = row.NAME;
    let message = row.MESSAGE;
    let pElement = document.createElement("p");
    pElement.innerText = username + ": " + message;
    messageContainer.appendChild(pElement);
}