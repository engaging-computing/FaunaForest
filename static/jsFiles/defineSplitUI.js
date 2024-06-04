class Puzzle {

    // constructor to create a puzzle object 
    constructor(featuresList, correctFeatures, leavesList, decisionNodes) {
        this.options = featuresList; // feature options for user to choose from 
        this.features = correctFeatures; // list of features  
        this.leaves = leavesList; // list of leaves 
        this.decisionNodesList = decisionNodes; // list of decision nodes (includes null for spots that should be blank)
    }

    // this function compares user's selections and the features to calculate the accuracy 
    checkAccuracy(selections) {
        // check selections against features 
        var mistakes = 0;

        
        var j = 0;
      
        for (let i = 0; i < selections.length; i++) {
            console.log("selections[i] " + selections[i]);
            console.log("this.decisionNodesList[i]: " + this.decisionNodesList[i]);
            console.log("this.features[j]: " + this.features[j]);
            console.log("i = " + i + "  j = " + j);

            if (selections[i] == null) {
                if (this.decisionNodesList[i] == null) {
                    mistakes++;
                    j++;
                    
                }
               
            }
            else if (selections[i].trim() != this.features[j].trim()) {
                mistakes++;
                j++;
            }
            else {
                j++;
            }
            
        } 
        

        console.log("num mistakes: " + mistakes);

        // find and return accuracy 
        return ((this.features.length - mistakes) / (1.0 * this.features.length)) * 100.0;
    }

    static loadPuzzles(varFilename) {
        let puzzlesList = [];

        const lines = varFilename.trim().split('\n');

        for (let i = 0; i < lines.length / 5; i+=5) {
            // lines[i] is list of feature options
            let allOptions = lines[i].trim().split(',');

            // lines[i + 1] is list of correct features
            let correctFeatures = lines[i+1].trim().split(',');

            // lines[i + 2] is list of leaves 
            let leaves = lines[i+2].trim().split(',');

            // lines [i + 3] is list of decision nodes including null placeholders 
            let nodesTemp = lines[i+3].trim().split(',');
            let decisionNodes = [];
            for (let j = 0; j < nodesTemp.length; j++) {
                if (nodesTemp[j].trim() == 'null') {
                    decisionNodes.push(null);
                }
                else {
                    decisionNodes.push(nodesTemp[j]);
                }
            }

            let puzzleTemp = new Puzzle(allOptions, correctFeatures, leaves, decisionNodes);
            puzzlesList.push(puzzleTemp);
        }

        console.log("puzzles list: " + puzzlesList);
        return puzzlesList;
    }

    static chooseRandomPuzzle(puzzlesList) {
        var randIndex = Math.floor(Math.random() * puzzlesList.length);
        return puzzlesList[randIndex];
    }

}

// write puzzles of depth 1 into here 
// here is the structure of the file:
    // list of feature options 
    // list of correct features 
    // list of leaves 
    // list of decisionNodes with null for where user will drag drop 
// leave one empty line after each puzzle's entry  
// don't forget empty line after the last puzzle
const puzzles1a = 
`Can it fly?, Can it swim?, Does it live on land?, Does it have fur? 
Can it fly? 
Dog, Bird
null

`;
const puzzles1b = 
`Can it fly?, Can it swim?, Does it live on land?, Does it have fur? 
Can it swim?
Sloth, Shark
null

`;
const puzzles1c = 
`Can it fly?, Is it an herbivore?, Does it have scales?, Does it live on land? 
Does it have scales?
Cat, Snake
null

`;

const puzzles1d = 
`Can it fly?, Does it live on land?, Does it have scales?, Is it an herbivore? 
Is it an herbivore?
Tiger, Elephant
null

`;

const puzzles1e = 
`Can it fly?, Is it an herbivore?, Is it a carnivore?, Does it have scales? 
Is it a carnivore?
Frog, Lion
null

`;

const depth1Puzzles = [puzzles1a, puzzles1b, puzzles1c, puzzles1d, puzzles1e];

function chooseRandomDepth1Puzzle() {
    var randIndex = Math.floor(Math.random() * depth1Puzzles.length);
    return depth1Puzzles[randIndex];
}


// write puzzles of depth 2 into here 
// here is the structure of the file:
    // list of feature options 
    // list of correct features -- do not include correct features that the user is already provided with
    // list of leaves 
    // list of decisionNodes with null for where user will drag drop 
// leave one empty line after each puzzle's entry  
// don't forget empty line after the last puzzle
const puzzles2a = 
`Does it live on land?, Does it live in water?, Does it have scales?, Does it have fur?, Does it fly? 
Does it live on land?, Does it have scales?
Shark, Fish, Dog, Snake
null, Can it be a pet?, null

`;

const puzzles2b = 
`Does it live in the water?, Can it dig?, Does it have scales?, Can it swim?, Can it fly? 
Can it fly?, Does it live in the water?
Dog, Bird, Snake, Fish
Does it have scales?, null, null

`;

const puzzles2c = 
`Does it have fur?, Does it have legs?, Does it have fins?, Can it swim?, Does it live in water? 
Does it have fur?, Does it have legs?
Dolphin, Ladybug, Dog, Bear
null, null, Can it climb?

`;

const puzzles2d = 
`Is it a bird?, Is it an amphibian?, Is it a carnivore?, Is it an herbivore?, Does it live on land? 
Is it an amphibian?, Is it an herbivore?
Spider, Frog, Tiger, Giraffe
Is it a mammal?, null, null

`;

const puzzles2e = 
`Is it an amphibian?, Is it a carnivore?, Is it an herbivore?, Does it live on land?, Does it have stripes? 
Is it a carnivore?, Does it have stripes?
Elephant, Zebra, Tiger, Dog
null, null, Can it be a pet?

`;

const puzzles2f = 
`Is it an amphibian?, Is it an herbivore?, Can it fly?, Does it have fur?, Does it have feathers? 
Does it have feathers?, Can it fly?
Horse, Dog, Ostrich, Falcon
null, Is it a carnivore?, null

`;

const puzzles2g = 
`Is it a carnivore?, Can it fly?, Does it have fur?, Can it talk?, Can it swim? 
Can it fly?, Can it talk?
Wolf, Dog, Falcon, Parrot
null, Can it be a pet?, null

`;

const puzzles2h = 
`Is it an apex predator?, Does it live in water?, Can it swim?, Can it climb trees?, Can it fly?
Can it climb trees?, Is it an apex predator?
Elephant, Squirrel, Goldfish, Shark
Does it live in water?, null, null

`;

const puzzles2i = 
`Can it be a pet?, Does it have feathers?, Can it fly?, Does it have an exoskeleton?, Can it swim? 
Can it be a pet?, Does it have feathers?
Hippo, Cat, Dragonfly, Eagle
Can it fly?, null, null

`;

const puzzles2j = 
`Is it an herbivore?, Is it an insect?, Can it fly?, Does it have spots?, Does it live in water? 
Is it an insect?, Does it live in water?
Sloth, Snail, Cheetah, Killer Whale
Is it very fast?, null, null

`;

const puzzles2k = 
`Is it a type of bear?, Is it an herbivore?, Does it have teeth?, Does it have a beak?, Does it live on land? 
Does it have teeth?, Does it have a beak?
Snail, Shark, Centipede, Eagle
Does it have legs?, null, null

`;

const puzzles2l = 
`Is it an insect?, Does it have 8 limbs?, Does it have scales?, Does it have wings?, Does it have feathers? 
Does it have 8 limbs?, Does it have scales?
Crow, Anaconda, Spider, Octopus
null, null, Does it live in water?

`;

const puzzles2m = 
`Is it a reptile?, Is it an arachnid?, Does it have wings?, Does it have opposable thumbs?, Does it have fur? 
Does it have fur?, Does it have opposable thumbs?
Seal, Butterfly, Lion, Orangutan
null, Can it fly?, null

`;

const puzzles2n = 
`Is it a reptile?, Is it a predator?, Can it swim?, Does it have stripes?, Is it an insect? 
Is it a predator?, Can it swim?
Deer, Goldfish, Jaguar, Falcon
null, null, Can it fly?

`;

const puzzles2o = 
`Is it an insect?, Can it camoflauge?, Can it climb trees?, Does it have a trunk?, Does it live in water? 
Does it live in water?, Can it climb trees?
Elephant, Panda, Goldfish, Octopus
null, null, Can it camoflauge?

`;

const puzzles2p = 
`Can it fly?, Can it change color?, Can it climb?, Is it a reptile?, Does it have 8 limbs? 
Can it fly?, Does it have 8 limbs?
Fox, Pigeon, Chameleon, Octopus
Can it change color?, null, null

`;

const puzzles2q = 
`Does it have stripes?, Can it fly?, Is it a carnivore?, Does it have a tail?, Is it a mammal?  
Does it have stripes?, Does it have a tail?
Lion, Zebra, Spider, Scorpion
Is it an arachnid, null, null

`;

const depth2Puzzles = [puzzles2a,puzzles2b, puzzles2c, puzzles2d, puzzles2e, puzzles2f, puzzles2g, puzzles2h, puzzles2i, puzzles2j, puzzles2k, puzzles2l, puzzles2m, puzzles2n, puzzles2o, puzzles2p, puzzles2q];

function chooseRandomDepth2Puzzle() {
    var randIndex = Math.floor(Math.random() * depth2Puzzles.length);
    return depth2Puzzles[randIndex];
}


let isPanelOpen = false;
var puzzlesDepth1;
var puzzlesDepth2;
var randPuzzle;
let userSelections = [];  
var currLevel = 1; // starts on level 1

var cummulativeAccuracy = 0; // for use in finding cummulative accuracy in level 3
var numPuzzles = 0; // for use in counting num puzzles in level 3
var completedPuzzles = 0;

var startTime = Math.floor(Date.now() / 1000); // number seconds since Jan 1, 1970

function showPuzzle1() { // to occur on startup of level 1

    currLevel = 1;
    userSelections = [null]; // only needs 1 element for puzzles of depth 1
    puzzlesDepth1 = Puzzle.loadPuzzles(chooseRandomDepth1Puzzle());
    randPuzzle = Puzzle.chooseRandomPuzzle(puzzlesDepth1);

    var treeDiv = document.getElementById('decisionTree');
    // for testing purposes 
    if (treeDiv == null) {
        console.log("treeDiv is null");
    }

    var container = treeDiv.querySelector('#level-2');
    // for testing purposes 
    if (container == null) {
        console.log("container is null");
    }

    // find leaf 1
    var leaf1 = container.querySelector("#node2"); 
    // for testing purposes
    if (leaf1 == null) {
        console.log("leaf1 is null");
    }
    // set text to leaf child text
    leaf1.textContent = randPuzzle.leaves[0];

    // find leaf 2
    var leaf2 = container.querySelector("#node3"); 
    // for testing purposes
    if (leaf2 == null) {
        console.log("leaf2 is null");
    }
    // set text to leaf child text
    leaf2.textContent = randPuzzle.leaves[1];

    createToastPanel();

    startTime = Math.floor(Date.now() / 1000); // update start time 
    
}

function showPuzzle2() { // to occur on startup of level 2

    currLevel = 2;
    userSelections = [null, null, null]; // only needs up to 3 elements for puzzles of depth 2
    puzzlesDepth2 = Puzzle.loadPuzzles(chooseRandomDepth2Puzzle());
    console.log("puzzles depth 2: " + puzzlesDepth2);

    randPuzzle = Puzzle.chooseRandomPuzzle(puzzlesDepth2);
    console.log("rand puzzle: " + randPuzzle);
    console.log("rand puzzle decision nodes: " + randPuzzle.decisionNodesList);

    var treeDiv = document.getElementById('decisionTree');
    // for testing purposes 
    if (treeDiv == null) {
        console.log("treeDiv is null");
    }

    if (randPuzzle.decisionNodesList[0] != null) { // node 1 is predefined in this puzzle 
        var container = treeDiv.querySelector('#level-1');
        var node1 = container.querySelector("#node1");

        var text = document.createElement('div');
        text.textContent = randPuzzle.decisionNodesList[0];
        text.style.transform = "rotate(-45deg)";
        text.style.fontSize = '25px';
        text.style.textAlign = 'center'; // Center-align the text

        node1.appendChild(text);
    }

    if (randPuzzle.decisionNodesList[1] != null) { // node 2 is predefined in this puzzle 
        var container = treeDiv.querySelector('#level-2');
        var node2 = container.querySelector("#node2");

        var text = document.createElement('div');
        text.textContent = randPuzzle.decisionNodesList[1];
        text.style.transform = "rotate(-45deg)";
        text.style.fontSize = '25px';
        text.style.textAlign = 'center'; // Center-align the text

        node2.appendChild(text);
    }

    if (randPuzzle.decisionNodesList[2] != null) { // node 3 is predefined in this puzzle 
        var container = treeDiv.querySelector('#level-2');
        var node3 = container.querySelector("#node3");

        var text = document.createElement('div');
        text.textContent = randPuzzle.decisionNodesList[2];
        text.style.transform = "rotate(-45deg)";
        text.style.fontSize = '25px';
        text.style.textAlign = 'center'; // Center-align the text

        node3.appendChild(text);

    }


    // set leaf nodes:

    var container = treeDiv.querySelector('#level-3');
    // for testing purposes 
    if (container == null) {
        console.log("container is null");
    }

    // find leaf 1
    var leaf1 = container.querySelector("#node4"); 
    // for testing purposes
    if (leaf1 == null) {
        console.log("leaf1 is null");
    }
    // set text to leaf child text
    leaf1.textContent = randPuzzle.leaves[0];

    // find leaf 2
    var leaf2 = container.querySelector("#node5"); 
    // for testing purposes
    if (leaf2 == null) {
        console.log("leaf2 is null");
    }
    // set text to leaf child text
    leaf2.textContent = randPuzzle.leaves[1];

    // find leaf 3
    var leaf3 = container.querySelector("#node6"); 
    // for testing purposes
    if (leaf3 == null) {
        console.log("leaf3 is null");
    }
    // set text to leaf child text
    leaf3.textContent = randPuzzle.leaves[2];

    // find leaf 4
    var leaf4 = container.querySelector("#node7"); 
    // for testing purposes
    if (leaf4 == null) {
        console.log("leaf4 is null");
    }
    // set text to leaf child text
    leaf4.textContent = randPuzzle.leaves[3];

    createToastPanel();

    startTime = Math.floor(Date.now() / 1000); // update start time 
    
}


function showPuzzle3() { // to randomly load a puzzle for level 3

    currLevel = 3;
    userSelections = [null, null, null]; // only needs up to 3 elements for puzzles of depth 2
    puzzlesDepth2 = Puzzle.loadPuzzles(chooseRandomDepth2Puzzle());
    console.log("puzzles depth 2: " + puzzlesDepth2);

    randPuzzle = Puzzle.chooseRandomPuzzle(puzzlesDepth2);
    console.log("rand puzzle: " + randPuzzle);
    console.log("rand puzzle decision nodes: " + randPuzzle.decisionNodesList);

    var treeDiv = document.getElementById('decisionTree');
    // for testing purposes 
    if (treeDiv == null) {
        console.log("treeDiv is null");
    }

    var container = treeDiv.querySelector('#level-1');
    var node1 = container.querySelector("#node1");
    node1.innerHTML = ''; // clear any text preexisting on the node
    if (randPuzzle.decisionNodesList[0] != null) { // node 1 is predefined in this puzzle 
        var container = treeDiv.querySelector('#level-1');
        var node1 = container.querySelector("#node1");
        node1.innerHTML = ''; // clear any text preexisting on the node 

        var text = document.createElement('div');
        text.textContent = randPuzzle.decisionNodesList[0];
        text.style.transform = "rotate(-45deg)";
        text.style.fontSize = '25px';
        text.style.textAlign = 'center'; // Center-align the text

        node1.appendChild(text);
    }

    var container = treeDiv.querySelector('#level-2');
        var node2 = container.querySelector("#node2");
        node2.innerHTML = ''; // clear any text preexisting on the node
    if (randPuzzle.decisionNodesList[1] != null) { // node 2 is predefined in this puzzle 
        var container = treeDiv.querySelector('#level-2');
        var node2 = container.querySelector("#node2");
        node2.innerHTML = ''; // clear any text preexisting on the node

        var text = document.createElement('div');
        text.textContent = randPuzzle.decisionNodesList[1];
        text.style.transform = "rotate(-45deg)";
        text.style.fontSize = '25px';
        text.style.textAlign = 'center'; // Center-align the text

        node2.appendChild(text);
    }

    var container = treeDiv.querySelector('#level-2');
        var node3 = container.querySelector("#node3");
        node3.innerHTML = ''; // clear any text preexisting on the node
    if (randPuzzle.decisionNodesList[2] != null) { // node 3 is predefined in this puzzle 
        var container = treeDiv.querySelector('#level-2');
        var node3 = container.querySelector("#node3");
        node3.innerHTML = ''; // clear any text preexisting on the node

        var text = document.createElement('div');
        text.textContent = randPuzzle.decisionNodesList[2];
        text.style.transform = "rotate(-45deg)";
        text.style.fontSize = '25px';
        text.style.textAlign = 'center'; // Center-align the text

        node3.appendChild(text);
    }


    // set leaf nodes:

    var container = treeDiv.querySelector('#level-3');
    // for testing purposes 
    if (container == null) {
        console.log("container is null");
    }

    // find leaf 1
    var leaf1 = container.querySelector("#node4"); 
    // for testing purposes
    if (leaf1 == null) {
        console.log("leaf1 is null");
    }
    // set text to leaf child text
    leaf1.textContent = randPuzzle.leaves[0];

    // find leaf 2
    var leaf2 = container.querySelector("#node5"); 
    // for testing purposes
    if (leaf2 == null) {
        console.log("leaf2 is null");
    }
    // set text to leaf child text
    leaf2.textContent = randPuzzle.leaves[1];

    // find leaf 3
    var leaf3 = container.querySelector("#node6"); 
    // for testing purposes
    if (leaf3 == null) {
        console.log("leaf3 is null");
    }
    // set text to leaf child text
    leaf3.textContent = randPuzzle.leaves[2];

    // find leaf 4
    var leaf4 = container.querySelector("#node7"); 
    // for testing purposes
    if (leaf4 == null) {
        console.log("leaf4 is null");
    }
    // set text to leaf child text
    leaf4.textContent = randPuzzle.leaves[3];

    createToastPanel();

    startTime = Math.floor(Date.now() / 1000); // update start time 
    
}

function startLevel3() {
    // remove overlay and popup menu 
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('level3StartingMenu');
    document.body.removeChild(popup); // remove popup menu
    overlay.style.display = "none"; // hide overlay 

    makeTimer();

    puzzleCountDiv(completedPuzzles);

    // load first puzzle
    showPuzzle3();

    // Start timer
    var secondsLeft = 90; // Set the initial time in seconds
    updateTimerDisplay(secondsLeft); // Display initial time

    var timerInterval = setInterval(function() {
        secondsLeft--; // Decrement the time
        updateTimerDisplay(secondsLeft); // Update the timer display

        if (secondsLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer when time is up
            afterTimerEnds();
        }
    }, 1000); // Update timer every second

    // Return a promise that resolves after the timer is done
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, secondsLeft * 1000); // Resolve the promise after the specified time
    });
}

// Function to update the timer display
function updateTimerDisplay(seconds) {
    var timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.innerText = seconds + 's';
    }
}
function showMessage(message, duration, fontSize) {
    // Create a div element for the message
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50px'; // Adjust top position as needed
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '10px 20px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = '1000'; // Ensure it's above other elements
    messageDiv.style.fontSize = fontSize + 'vw'; // Set the font size in viewport width units

    // Append the message div to the body
    document.body.appendChild(messageDiv);

    // Remove the message div after the specified duration
    setTimeout(function() {
        messageDiv.parentNode.removeChild(messageDiv);
    }, duration);
}

function showNextPuzzle() { // shows next puzzle (for use in level 3)\
    console.log("Drop function has been called", dropCount.count, "times.");
    if(dropCount.count<2){
     showMessage('Finish the puzzle before moving onto the next one!', 5000 , 1.5);
    return;
    }
     dropCount.count = 0;
    completedPuzzles++;
    puzzleCountDiv(completedPuzzles);
    // calculate accuracy 
    var accuracy = calculateAccuracy(randPuzzle, userSelections, currLevel);
    // save accuracy 
    saveData(Math.floor(Date.now() / 1000) - startTime, accuracy, currLevel, completedPuzzles);

    // update cummulative accuracy 
    cummulativeAccuracy += accuracy;
    numPuzzles++;

    // load next puzzle 
    showPuzzle3();
}

function createToast() {
    // check if xAxisValues array is empty, if so, fetch the CSV
    if (puzzlesDepth1.length === 0) {
        const csvPath = 'http://127.0.0.1:8000/static/animals.csv';

        fetch(csvPath)
            .then(response => response.text())
            .then(data => {
                // Split the CSV data into lines
                const lines = data.split('\n');
                // Split the first line (X-axis values) into an array
                xAxisValues = lines[0].split(',');
                // Remove 'animal name' and 'classification'
                xAxisValues.shift();
                xAxisValues.shift();
                // Create the toast panel with buttons
                createToastPanel();
            })
            .catch(error => {
                console.error('Error loading CSV file:', error);
            });
    } else {
        // if xAxisValues array is not empty, create the panel with buttons
        createToastPanel();
    }

}

function callCalculateAccuracy() {
    // calls calcuateAccuracy() in testAccuracy to do the calculations  
    var accuracy = calculateAccuracy(randPuzzle, userSelections, currLevel);

    // displays the accuracy along with tryAgain and nextLevel buttons 
    showAccuracy(startTime, accuracy, currLevel);
}

function createToastPanel() {

    // Check if the panel is already open
    if (isPanelOpen) {
        // Close the panel
        closePanel();
    }

    // create a panel element
    const panel = document.createElement('div');
    panel.className = 'toast-panel';

    // create a message element
    const message = document.createElement('div');
    const message2 = document.createElement('div');
    message.textContent = "--Drag and drop one of the questions below into the dark green box on the right that will fit with the answers best!";
    message.className = 'toast-message';
    
    message2.textContent = "--You can replace your answer by dragging a new one into the box";
    message2.className = 'toast-message';
    panel.appendChild(message);
    panel.appendChild(message2);

    // create draggable items container
    const draggableItems = document.createElement('div');
    draggableItems.id = 'draggableItems';
    draggableItems.className = 'toast-draggable-items';

    // Add draggable items based on X-axis values

    for (let i = 0; i < randPuzzle.options.length; i++) {
        const draggableItem = document.createElement('div');
        draggableItem.textContent = randPuzzle.options[i].trim();
        draggableItem.className = 'toast-draggable';
        draggableItem.draggable = true;
        draggableItem.id = `draggable-${i}`;

        // Add drag start event listener
    draggableItem.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData("text", event.target.id);
    const cursorImage = document.getElementById('tutorialcursor');
    const cursorImagestart = document.getElementById('tutorialcursorstart');
    cursorImagestart.style.opacity = "0";

    // Calculate the offset to center the drag element on the cursor
    const offsetX = event.target.offsetWidth / 2;
    const offsetY = event.target.offsetHeight / 2;
  
    // Set the drag image to be centered on the cursor
    event.dataTransfer.setDragImage(event.target, offsetX, offsetY);

    cursorImage.style.animation = "fadeIn 0.2s forwards"; // Apply the fade-in animation
    setTimeout(() => {
        cursorImage.style.opacity = "1"; 
        cursorImage.style.animation = "slide 3s forwards"; // Apply the slide animation
    }, 500);
});

        draggableItems.appendChild(draggableItem);

    }

    panel.appendChild(draggableItems);

    // Append the panel to the body
    document.body.appendChild(panel);

    // Update the flag to indicate that the panel is open
    isPanelOpen = true;

}


function closePanel() {
  // Find and remove the panel from the DOM
  const panel = document.querySelector('.toast-panel');
  if (panel) {
    panel.remove();
    isPanelOpen = false; // Update the flag to indicate that the panel is closed
  }
}

function afterTimerEnds() {

    // display end screen w/ accuracy and show restart button 
    if (numPuzzles == 0 ) {
        var finalAccuracy = 0;
    }
    else {
        var finalAccuracy = (cummulativeAccuracy * 1.0) / numPuzzles;
    }

    if (true) { // just want a container for this code so set condition = true 
        
        // Create the popup menu container
        var popupMenu = document.createElement('div');
        popupMenu.classList.add('popup-menu');

        // Create the num puzzles message
        var puzzlesMessage = document.createElement('p');
        puzzlesMessage.textContent = "You completed " + numPuzzles + " puzzles!";
        puzzlesMessage.style.fontSize = '50px';
        puzzlesMessage.style.textAlign = 'center';
        puzzlesMessage.style.color = 'white';
        puzzlesMessage.style.textShadow = "-2px -2px 0 #006400, 2px -2px 0 #006400, -2px 2px 0 #006400, 2px 2px 0 #006400";
        puzzlesMessage.style.fontFamily = 'Bradley Hand';

        var accuracyMessage = document.createElement('p');
        accuracyMessage.textContent = "Accuracy: " + finalAccuracy.toFixed(3) + "%";
        accuracyMessage.style.fontSize = '50px';
        accuracyMessage.style.textAlign = 'center';
        accuracyMessage.style.color = 'white';
        accuracyMessage.style.textShadow = "-2px -2px 0 #006400, 2px -2px 0 #006400, -2px 2px 0 #006400, 2px 2px 0 #006400";
        // accuracyMessage.style.fontFamily = 'Bradley Hand';

        popupMenu.appendChild(puzzlesMessage);
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
        else if (currLevel == 3) {
            button2.onclick = restartGame;
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
        buttons[0].style.backgroundImage = "url('static/Retry.png')"; 
        buttons[0].style.backgroundSize = "contain"; // Adjust how the background image is sized
    
        buttons[1].style.backgroundImage = "url('static/endgame.png')"; 
        buttons[1].style.backgroundSize = "contain"; // Adjust how the background image is sized

        // Append the popup menu to the body
        document.body.appendChild(popupMenu);

        var overlay = document.getElementById("overlay");
        overlay.style.display = "block";

        saveData(30, finalAccuracy, '3_overall', completedPuzzles); // saves acuracy to data file
        // numPuzzles corresponds to total number of puzzles complete during level 3 on this line 
        // '3_overall' indicates this is the user's overall stats for level 3 

    }
}

// creates timer div to display the number of seconds remaining 
function makeTimer() {
    // Display timer element
    var timerElement = document.createElement('div');
    timerElement.id = 'timer';
    timerElement.style.position = 'absolute';
    timerElement.style.left = '7%';
    timerElement.style.top = '3%';
    timerElement.style.fontSize = '30px';
    timerElement.style.color = 'white';

    // Add outline and background color
    timerElement.style.border = '2px solid black'; // Adjust the width and color of the outline as needed
    timerElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Adjust the color and opacity of the background
    timerElement.style.borderRadius = '50%'; // Make the border radius 50% to create a circle

    // Set width and height to ensure it's a circle
    timerElement.style.width = '55px'; // Adjust the width of the circle as needed
    timerElement.style.height = '55px'; // Adjust the height of the circle as needed

    // Center the text vertically and horizontally
    timerElement.style.display = 'flex';
    timerElement.style.alignItems = 'center';
    timerElement.style.justifyContent = 'center';

    // Append the timer element to the document body
    document.body.appendChild(timerElement);
}

// will make or update the puzzle count div 
function puzzleCountDiv(completedPuzzles) {

    var completedPuzzlesDiv = document.getElementById('completedPuzzles');
    if (!completedPuzzlesDiv) {
        // Create the div element if it doesn't exist
        completedPuzzlesDiv = document.createElement('div');
        completedPuzzlesDiv.id = 'completedPuzzles';
        completedPuzzlesDiv.style.position = 'absolute';
        completedPuzzlesDiv.style.top = '90%';
        completedPuzzlesDiv.style.right = '68%';
        completedPuzzlesDiv.style.fontSize = '30px';
        completedPuzzlesDiv.style.color = 'white';
        completedPuzzlesDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        completedPuzzlesDiv.style.padding = '10px';
        completedPuzzlesDiv.style.borderRadius = '5px';
        completedPuzzlesDiv.textContent = 'Puzzles Completed: 0';
        document.body.appendChild(completedPuzzlesDiv);
    }

    // Update the content of the div element with the number of completed puzzles
    completedPuzzlesDiv.textContent = 'Puzzles Completed: ' + completedPuzzles;

}









function glowTextbox(nextNodeNumber) {
    let id = 'node' + String(nextNodeNumber);
    var container = findContainer(nextNodeNumber);
    var textbox = container.querySelector("#" + id); 
    //textbox.classList.add("glowing-textbox"); // Add the glowing-textbox class
    // Define the glow effect using box-shadow
    //textbox.style.boxShadow = "0 0 10px rgba(0, 255, 0, 0.7)"; // Green glow with opacity
    if (textbox == null) {
        console.log("((glow)) nextNodeNumber=" + nextNodeNumber + ".  textbox for " + id + " is null");
    }
    else {
        textbox.style.backgroundColor = "#006400";
    }

}
  
// Function to remove the glow effect
function removeGlow() {
    var i = 0;
    for (i = treeNodes.length - 1; i >= 0; i--) {
        if (treeNodes[i] != null) {
            let id = 'node' + String(i + 1);
            var container = findContainer(i + 1);
            var textbox = container.querySelector("#" + id);         
            if (textbox == null) {
                console.log("((removeGlow)) nextNodeNumber=" + i + ".  textbox for " + id + " is null");
            }
            else {
                textbox.style.backgroundColor = "";
            } 
        }
    }
}

function findContainer(nodeNumber) {
    var level = 0;
    if (nodeNumber == 1) {
        level = 1;
    }
    else if (nodeNumber <= 3) {
        level = 2;
    }
    else if (nodeNumber <= 7) {
        level = 3;
    }
    else {
        level = 4;
    }
    var treeDiv = document.getElementById('decisionTree');
    var container = treeDiv.querySelector('#level-' + level);

    if (container == null) {
        console.log("container is null");
    }

    return container;
}

function styleDecisionNode(feature, nodeNumber) {
    let id = 'node' + String(nodeNumber);
    var container = findContainer(nodeNumber);
    var textbox = container.querySelector("#" + id); 

    // change shape 
    textbox.style.transform = "rotate(45deg)";
    textbox.style.width = "100px";
    textbox.style.height = "100px"
    
    var textInsideDiv = document.createElement("div");
    // Set the content of the div
    textInsideDiv.textContent = feature;
    // Add the class "text-inside" to the div
    textInsideDiv.classList.add("text-inside");
    // Append the new div to the parent div
    textbox.appendChild(textInsideDiv);

    displayBranch(nodeNumber, false);
}

function styleLeafNode(classification, nodeNumber) {
    let id = 'node' + String(nodeNumber);
    var container = findContainer(nodeNumber);
    var textbox = container.querySelector("#" + id);
    
    var textNode = document.createTextNode(classification);
    textbox.append(textNode); 

    displayBranch(nodeNumber, true);

}

function displayBranch(nodeNumber, isLeafNode) {
    if (nodeNumber != 1) {
        var branches = document.getElementById('branches');
        var number;

        if (nodeNumber  <= 3) {
            number = 1;
        }
        else if (nodeNumber <= 7) {
            number = 2;
        }
        else {
            number = 3;
        }

        var container = branches.querySelector('#branches' + number);
        var branch = container.querySelector('#branch' + (nodeNumber - 1));
        branch.style.border = '1px solid black';  

        if (!isLeafNode) {
            if ((nodeNumber - 1) % 2 == 0) { // yes branch 
                branch.style.transform = "rotate(-45deg)";
            }
            else { // no branch 
                branch.style.transform = "rotate(45deg)";
            }
            const currentHeight = parseInt(window.getComputedStyle(branch).height);
            // Decrement the height by 10 pixels
            const newHeight = currentHeight - 50;
            // Set the new height to the element
            branch.style.height = `${newHeight}px`;
            
        }
    }
}
