
// saves accuracy to datafile 
function saveData(time, accuracy, level, puzzleNum) {

    return; // just returns for now. later, will implement saving data in client-side browser 
    
    /** commented out save data code that uses flask/python
    var dataToSave = time + ', Level ' + level + ', ' + accuracy + ', ' + puzzleNum;
    var data = { value: dataToSave };  // Data to be saved
  
    fetch('/dataFolder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);  // Log the result from the server
    })
    .catch(error => {
        console.error('Error:', error);
    });
    */
}

// calculates accuracy and returns it 
function calculateAccuracy(puzzle, selections, currLevel) {
    // calculate accuracy 
    var accuracy = puzzle.checkAccuracy(selections);
    console.log("Accuracy is " + accuracy);

    return accuracy;
}

// displays accuracy and tryAgain/nextLevel buttons to user 
function showAccuracy(startTime, accuracy, currLevel) {
    // Create the popup menu container
    var popupMenu = document.createElement('div');
    popupMenu.classList.add('popup-menu');

    // Create the accuracy message
    var accuracyMessage = document.createElement('p');
    accuracyMessage.textContent = 'Accuracy: ' + accuracy.toFixed(3) + "%";
    accuracyMessage.style.fontSize = '100px';
    accuracyMessage.style.textAlign = 'center';
    accuracyMessage.style.color = 'white';
    accuracyMessage.style.textShadow = "-2px -2px 0 #006400, 2px -2px 0 #006400, -2px 2px 0 #006400, 2px 2px 0 #006400";
    //accuracyMessage.style.fontFamily = 'Bradley Hand';

    popupMenu.appendChild(accuracyMessage);

    // Create the buttons container
    var buttonsContainer = document.createElement('div');

    // Create the first button
    var button1 = document.createElement('button');
    buttonsContainer.appendChild(button1);

    // Create the second button
    var button2 = document.createElement('button');
    buttonsContainer.appendChild(button2);

    // set onClick functions for both buttons
    button1.onclick = tryAgain;

    if (currLevel == 1) {
        button2.onclick = gotoLevel2;
    }
    else if (currLevel == 2) {
        button2.onclick = gotoLevel3;
    }

    // Append the buttons container to the popup menu
    popupMenu.appendChild(buttonsContainer);

    // Add styles to the popup menu
    popupMenu.style.position = 'absolute';
    popupMenu.style.top = '50%';
    popupMenu.style.left = '50%';
    popupMenu.style.transform = 'translate(-50%, -50%)';
    popupMenu.style.minWidth = '120px';
    popupMenu.style.width = '1000px';
    popupMenu.style.height = '500px';
    popupMenu.style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.2)';
    popupMenu.style.padding = '10px';
    popupMenu.style.backgroundColor = "#87ffbf";
    popupMenu.style.zIndex = '10';

    // Add styles to the buttons container
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.justifyContent = 'space-around';
    buttonsContainer.style.marginTop = '100px';
    popupMenu.style.justifyContent = 'center'; // Center horizontally
    popupMenu.style.alignItems = 'center'; // Center vertically

    // Add styles to the buttons
    var buttons = buttonsContainer.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.style.padding = '8px 12px';
        button.style.backgroundColor = '#007bff';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.width = '400px';
        button.style.height = '90px';

    }
    buttons[0].style.backgroundImage = "url('static/restartLevel.png')"; 
    buttons[0].style.backgroundSize = "contain"; // Adjust how the background image is sized
  
    buttons[1].style.backgroundImage = "url('static/nextLevel.png')"; 
    buttons[1].style.backgroundSize = "contain"; // Adjust how the background image is sized

    // Append the popup menu to the body
    document.body.appendChild(popupMenu);

    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";

    var time = Math.floor(Date.now() / 1000) - startTime;
    console.log("currTime and startTime: " + Math.floor(Date.now() / 1000) + "     " + startTime);

    saveData(time, accuracy, currLevel, -1); // saves acuracy to data file
    // -1 means no puzzle num is not relevant for this level 

}

// onClick for tryAgain 
function tryAgain() {
    console.log('restartLevel was clicked');
    location.reload(); // should restart the level 
    // TODO: test if this reloading works after implementing multiple levels 
}

// onClick for nextLevel
function gotoLevel2() {
    // Function for button 2
    console.log('nextLevel was clicked');

    // Redirect to puzzle2.html
    window.location.href = 'puzzle2.html';
}

function gotoLevel3() {
    // Function for button 2
    console.log('want to go to level 3');

    // Redirect to puzzle3.html
    window.location.href = 'puzzle3.html';
    
}

function restartGame() {
    console.log("restart game was clicked");
    
    // Redirect the browser to the login page URL
    window.location.href = "login.html"; 
    
}





