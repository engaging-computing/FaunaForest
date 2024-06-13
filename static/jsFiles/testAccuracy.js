
// saves accuracy to datafile 
function saveData(time, accuracy, level, puzzleNum) {

    // data saving is adapted from code in AI-for-ASL project:

    let firstName = localStorage.getItem('fname');
    let lastInitial = localStorage.getItem('linitial');
    let ageRange = localStorage.getItem('agerange');

    var date = new Date();
    var formattedDate = (date.getMonth() + 1) + "/"
        + date.getDate() + "/"
        + date.getFullYear() + " - "
        + date.getHours() + ":"
        + date.getMinutes() + ":"
        + date.getSeconds();

    // Create user key
    let userKey = `${firstName}_${lastInitial}_${ageRange}`;

    // Retrieve existing data for this user
    let userData = localStorage.getItem(userKey);
    if (userData) {
        userData = JSON.parse(userData);
    } else {
        userData = [];
    }

    // Add new game stats to the user's data array
    userData.push({
        identifier: userKey,
        timestamp: formattedDate,
        secsOnPuzzle: time,
        level: level,
        accuracy: accuracy,
        numPuzzles: puzzleNum,
    });

    // Save updated data back to local storage
    localStorage.setItem(userKey, JSON.stringify(userData));

    // new addition
    localStorage.setItem('mainkey', JSON.stringify(userKey));
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

    // save data to computer -- for demo days 
    saveUserDataToComputer();

    // Redirect the browser to the login page URL
    window.location.href = "index.html"; 
    
}

function saveUserDataToComputer() {
    let allUserData = {};

    // Generate the timestamp
    let date = new Date();
    let timestamp = `${date.getFullYear() % 100}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}`;
    
    if (localStorage.length > 0) {
        // Use the last key in local storage for the filename
        let lastKey = localStorage.key(localStorage.length - 1);
        let mainKey = localStorage.getItem('mainkey'); // Retrieve the main key name

        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            try {
                allUserData[key] = JSON.parse(value);
            } catch (e) {
                console.warn(`Skipping key ${key} due to invalid JSON: ${value}`);
            }
        }
    
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allUserData, null, 2));
        let downloadAnchorNode = document.createElement('a');
        let filename = `${mainKey}_${timestamp}.json`;
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", filename);
        document.body.appendChild(downloadAnchorNode); // Required for Firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    
        // Clear local storage
        localStorage.clear();
    } else {
        console.warn('No data in local storage to download.');
    }
    
}





