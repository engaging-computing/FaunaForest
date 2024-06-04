//this will attempt to follow the tree to place each animal, doesn't work properly since nodes aren't properly kept track of
/** 
function classifyAnimals() {
    const csvPath = 'http://127.0.0.1:8000/static/animals.csv';

    fetch(csvPath)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const headers = lines[0].split(',');

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',');
                const animal = {};

                //defining classifications for animal object
                animal.name = values[0].trim();
                animal.hasFur = values[1].trim() === '1';
                animal.canFly = values[2].trim() === '1';
                animal.canSwim = values[3].trim() === '1';
                animal.hasScales = values[4].trim() === '1';
                animal.numLimbs = parseInt(values[5].trim());
                animal.weight = parseInt(values[6].trim());

                // Follow the decision tree for this animal
                let currentNode = tree;
                let node = 1; // Starting node
                let depth = 1; // Starting depth

                while (currentNode.hasOwnProperty('yes') || currentNode.hasOwnProperty('no')) {
                    const classification = currentNode.classification;
                    const isYes = animal[classification];

                    if (isYes) {
                        node = node * 2;
                        currentNode = currentNode.yes;
                    } else {
                        node = node * 2 + 1;
                        currentNode = currentNode.no;
                    }

                    depth++;
                }

                // add the final classification and node to the animal object
                animal.finalClassification = currentNode.classification;
                animal.finalNode = node;

                console.log(`Animal: ${animal.name}, Final Classification: ${animal.finalClassification}, Final Node: ${animal.finalNode}`);
            }
        })
        .catch(error => {
            console.error('Error loading CSV file:', error);
        });
} */
function saveData() {
    let treeNodes = getTreeNodes();
    var data = { value: treeNodes };  // Data to be saved
  
  
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
}







function classifyAnimals() { //added savedata to the bottom

    let treeNodes = getTreeNodes();
    console.log("entered testAccuracy");
    console.log(treeNodes);
    saveData();
    // load animals 
    let animalsCombined = loadAnimals(); // loads as 2d array separated by classification
    let animals = [];
    
    // make it a 1D array 
    for (let i = 0; i < animalsCombined.length; i++) {
        for (let j = 0; j < animalsCombined[i].length; j++) {
            animals.push(animalsCombined[i][j]);
        }
    }

    var totalAnimals = animals.length;
    var correctPredictions = 0;
    var incorrectPredictions = 0;


    for (let i = 0; i < animals.length; i++) { // for each animal
        var animal = animals[i];

        // for use with max voting count 
        var numMammals = 0;
        var numBirds = 0;
        var numReptiles = 0;
        var numFish = 0;

        // find predicted outcome 
        let predictions = [];

        // for each tree
        for (let j = 0; j < treeNodes.length; j++) {
            if (treeNodes[j].length != 0) {
                // create tree object 
                let root = treeNodes[j][0];
                let decisionTree = new DecisionTree(root);
                predictions[j] = decisionTree.followTree(animal);

                if (predictions[j] == 'mammal') {
                    numMammals++;
                }
                else if (predictions[j] == 'bird') {
                    numBirds++;
                }
                else if (predictions[j] == 'reptile') {
                    numReptiles++;
                }
                else { // fish 
                    numFish++;
                }
            }
        }

        

        let voting = [];
        voting.push(numMammals);
        voting.push(numBirds);
        voting.push(numReptiles);
        voting.push(numFish);

        var indexMax = 0;
        for (let z = 1; z < voting.length; z++) {
            if (voting[z] > voting[indexMax]) {
                indexMax = z;
            }
        }

        var predictedClassification;

        if (indexMax == 0) {
            predictedClassification = 'mammal';
        }
        else if (indexMax == 1) {
            predictedClassification = 'bird';
        }
        else if (indexMax == 2) {
            predictedClassification = 'reptile';
        }
        else {
            predictedClassification = 'fish';
        }

        
        // find actual classification
        var actualClassification = animal.features["strClassification"];

        // update correctPredictions and incorrectPredictions
        if (predictedClassification == actualClassification) {
            correctPredictions++;
        }
        else {
            incorrectPredictions++;
        }
      
    } 

    // calculate accuracy 
    var accuracy = (1.0 * correctPredictions) / totalAnimals;
    console.log("Accuracy is " + accuracy);

    // TODO: calculate other statistics if needed and write to data files 

    // display accuracy 
    showAccuracy(accuracy);

    // return accuracy 
    return accuracy;
}

function showAccuracy(accuracy) {
    // Create the pop-up container
    const popup = document.createElement('div');
    popup.id = 'popup';
  
    // Create and add text content
    const text = document.createTextNode('Accuracy: ' + accuracy);
    popup.appendChild(text);

    // Apply styling to the pop-up container
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
  
    // Append the pop-up container to the body
    document.body.appendChild(popup);
  }


