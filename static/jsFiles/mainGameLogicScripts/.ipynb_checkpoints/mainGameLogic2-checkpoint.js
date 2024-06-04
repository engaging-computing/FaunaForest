
console.log("mainGameLogic2 is running");

/**
 * 
 * class animal:
 * 
 */
class Animal {

    // classification - String representing the classification (mammal, bird, fish, reptile)
    // name - String representing name of animal 
    // canFly - boolean representing whether or not animal can fly 
    // canSwim - boolean representing whether or not animal can swim 
    // hasFur - boolean representing whether or not animal has fur 
    // hasScales - boolean representing whether or not animal has scales
    // numLimbs - int representing number of limbs

    constructor(classificationStr, name, canFly, canSwim, hasFur, hasScales, numLimbs, weight) {

        this.features = {
            "strClassification" : classificationStr,
            "numClassification" : Classification.translateToNumber(classificationStr),
            "name" : name,
            "canFly" : canFly,
            "canSwim" : canSwim,
            "hasFur" : hasFur,
            "hasScales" : hasScales,
            "numLimbs" : numLimbs,
            "weight" : weight
        }

        /** 
        this.name = name;
        this.canFly = canFly;
        this.canSwim = canSwim;
        this.hasFur = hasFur;
        this.hasScales = hasScales;
        this.numLimbs = numLimbs; */

    }

    toString() {
        var str = "Hi! I am a " + this.features.name + ".\n";

        str += "I am a " + this.features.strClassification + ".\n";

        if (this.features.canFly == 1) {
            str += "I can fly.\n";
        }
        else {
            str += "I cannot fly.\n";
        }

        if (this.features.canSwim == 1) {
            str += "I can swim.\n";
        }
        else {
            str += "I cannot swim.\n";
        }

        if (this.features.hasFur == 1) {
            str += "I have fur.\n";
        }
        else {
            str += "I do not have fur.\n";
        }

        if (this.features.hasScales == 1) {
            str += "I have scales.\n";
        }
        else {
            str += "I do not have scales.\n";
        }

        /** uncomment after adding numLimbs and weight to decision tree portions  
        str += "I have " + this.features.numLimbs + "limbs.\n";
        str += "I weight " + this.features.weight + " pounds.\n"
        */
        
        return str;
    }

    static loadAnimals() {
        const animalsFileContents = animalsCSV;
        console.log(animalsFileContents);

        const lines = animalsFileContents.trim().split('\n');

        let mammalArray = [];
        let birdArray = [];
        let reptileArray = [];
        let fishArray = [];

        // Process each line
        lines.forEach((line, index) => {

            // for testing purposes 
            //console.log(`Line ${index + 1}: ${line}`);

            if (index != 0) {
                var tokens = line.split(',');

                // for testing purposes
                //console.log("Tokens: " + tokens);

                var animalTemp = new Animal(tokens[1], tokens[0], parseInt(tokens[2]), parseInt(tokens[3]), parseInt(tokens[4]), parseInt(tokens[5]), parseInt(tokens[6]), parseInt(tokens[7]));
                
                if (animalTemp.features.strClassification == "mammal") {
                    mammalArray.push(animalTemp);
                }
                else if (animalTemp.features.strClassification == "bird") {
                    birdArray.push(animalTemp);
                }
                else if (animalTemp.features.strClassification == "reptile") {
                    reptileArray.push(animalTemp);
                }
                else if (animalTemp.features.strClassification == "fish") {
                    fishArray.push(animalTemp);
                }
                else {
                    console.log("Error in assigning " + animalTemp.getName() + " to corresponding array");
                }
            }

        });

        /** 
        // for testing purposes 
        console.log("Mammals: " + mammalArray);
        console.log("Birds: " + birdArray);
        console.log("Reptiles: " + reptileArray);
        console.log("Fish: " + fishArray); 
        */

        let combinedArray = [mammalArray, birdArray, reptileArray, fishArray];
        return combinedArray;

    }

}

/**
 * 
 * class classification:
 * 
 */
class Classification {

    constructor(classification) {
        this.classification = classification; 
        this.numericClassification = this.translateToNumber(classification);
    }

    static translateToNumber(stringClassification) {

        var numericClassification;

        if (stringClassification.toUpperCase() == "MAMMAL") {
            numericClassification = 1;
        }
        else if (stringClassification.toUpperCase() == "BIRD") {
            numericClassification = 2;
        }
        else if (stringClassification.toUpperCase() == "FISH") {
            numericClassification = 3;
        }
        else if (stringClassification.toUpperCase() == "REPTILE") {
            numericClassification = 4;
        }
        else {
            numericClassification= -1;
            // numericClassification of -1 indicates error in mapping to a predefined classification (mammal, bird, fish, reptile)
        }

        return numericClassification;

    }
}

/**
 * 
 * classes related to decision tree:
 * 
 */
class DecisionNode {

    // decision represents string feature name that is being considered at the decision node 
    // left --> no/false 
    // right --> yes/true 

    constructor(feature) {
        this.decision = feature; // string representation of feature name that is being considered
        this.left = null;
        this.right = null;
    }

    getDecision() {
        return this.decision;
    }

    getLeftChild() {
        return this.left;
    }
    
    getRightChild() {
        return this.right;
    }

    pickBranch(animal) {
        if (animal.features[this.decision]) {
            return this.getRightChild();
        }
        else {
            return this.getLeftChild();
        }
    }

    isDecisionNode() {
        return true;
    }

}

class LeafNode {

    constructor(classification) {
        this.classification = classification;
    }    

    isDecisionNode() {
        return false;
    }

}

class DecisionTree {

    constructor(rootDecisionNode) {
        this.root = rootDecisionNode;
    }

    /** 
    static buildTree() {
        let featuresList = ["canFly", "canSwim", "hasFur", "hasScales"];
        let prevFeaturesList = ["canFly", "canSwim", "hasFur", "hasScales"];

        var pickedFeature;

        // creating root node ----------------------------------------------------------------------------
        var rootNodeElement = document.createElement('div');
        rootNodeElement.id = 'rootNode'; 
        styleNode(rootNodeElement.id, "What should we consider here?");

        // done creating root node ----------------------------------------------------------------------------

    } */

    
   static buildTree() {

        var featureWrapper = { feature: "empty starter value" };

        let featuresList = ["canFly", "canSwim", "hasFur", "hasScales"];
        let prevList = ["canFly", "canSwim", "hasFur", "hasScales"];

        var pickedFeature;

        // prompt to create root decision node 
        var rootNodeElement = document.createElement('div');
        rootNodeElement.id = 'decisionNode1'; 


        // Append the new div to the document body
        styleNode(rootNodeElement.id, "What feature should we consider first?")
        styleButtons(featureWrapper, rootNodeElement, featuresList);
        //pickedFeature = findClickedFeature(prevList, featuresList);
        pickedFeature = waitForFeatureSelection(featuresList, rootNodeElement.id);
        
        document.body.appendChild(rootNodeElement);
        //var rootFeature = prompt("What feature should we consider first?");
        var rootNode = new DecisionNode(featureWrapper.feature);
        console.log(pickedFeature + " was clicked");

        // prompt to create left node 
        var decision2 = prompt("What feature should we consider here?");
        var decisionNode2 = new DecisionNode(decision2);
        rootNode.left = decisionNode2;

        var leaf1 = prompt("What classification should be here?");
        var leafNode1 = new LeafNode(leaf1);
        decisionNode2.left = leafNode1;

        var leaf2 = prompt("What classification should be here?");
        var leafNode2 = new LeafNode(leaf2);
        decisionNode2.right = leafNode2;

        // prompt to create right node 
        var decision3 = prompt("What feature should we consider here?");
        var decisionNode3 = new DecisionNode(decision3);
        rootNode.right = decisionNode3;

        var leaf3 = prompt("What classification should be here?");
        var leafNode3 = new LeafNode(leaf3);
        decisionNode3.left = leafNode3;

        var leaf4 = prompt("What classification should be here?");
        var leafNode4 = new LeafNode(leaf4);
        decisionNode3.right = leafNode4;

        let decisionTreeTemp = new DecisionTree(rootNode);
        console.log(featureWrapper.feature + " was clicked");

        return decisionTreeTemp;
    }
    
   


    defineSplit(feature) {
        tempDecisionNode = new DecisionNode(feature);
        return tempDecisionNode;
    }

    defineLeaf(classification) {
        tempLeafNode = new LeafNode(classification);
        return tempLeafNode;
    }

    followTree(animal) {
        // make decision at root 
        let currNode = this.root.pickBranch(animal);

        // counter for testing purposes
        var i = 0; 
        while(currNode.isDecisionNode()) {

            if (currNode == null) {
                console.log("currNode is null");
            }

            currNode = currNode.pickBranch(animal);

            // (for testing purposes) check for infinite loop
            i++;
            if (i > 5) {
                console.log("breaking from decision tree traversal b/c i = " + i);
                break;
            }
            
        }
        
        // return classification
        return currNode.classification;
    }

}

/**
 * 
 * put csv that contains list of animals and their features here:
 * 
 */
const animalsCSV = `name,classification,canFly,canSwim,hasFur,hasScales,numLimbs,weight
dog,mammal,0,1,1,0,4,0
eagle,bird,1,0,0,0,2,0
snake,reptile,0,1,0,1,0,0
piranha,fish,0,1,0,1,0,0`;


function showAnimal(animalObj) {

    var textBox = document.getElementById('text');
    if (textBox == null) {
        console.log("textBox is null");
    }

    textBox.textContent = textBox.textContent + "\n\n" + animalObj.toString();

}


function startGame() {
    
    console.log("just entered startGame()");

    // load animals using loadAnimals() in class animal
    let animalArray = Animal.loadAnimals();

    let mammalArray = animalArray[0];
    let birdArray = animalArray[1];
    let reptileArray = animalArray[2];
    let fishArray = animalArray[3];

    // randomly select 4 animals to put into 'data sets'
    var numMammals = mammalArray.length;
    var numBirds = birdArray.length;
    var numReptiles = reptileArray.length;
    var numFish = fishArray.length;

    var randMammalIndex = Math.floor(Math.random() * numMammals);
    var randBirdIndex = Math.floor(Math.random() * numBirds);
    var randReptileIndex = Math.floor(Math.random() * numReptiles);
    var randFishIndex = Math.floor(Math.random() * numFish);

    // show each of the 4 using showAnimal()
    showAnimal(mammalArray[randMammalIndex]);
    showAnimal(birdArray[randBirdIndex]);
    showAnimal(reptileArray[randReptileIndex]);
    showAnimal(fishArray[randFishIndex]);

    // call buildTree()
    let userTree =  DecisionTree.buildTree();

  
}

function styleNode(elementId, text) {
    let element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id '${elementId}' not found.`);
        return; // Exit the function early if element is not found
    }

    console.log("inside styleNode(): element id is " + elementId);

    element.style.width = '300px';
    element.style.height = '50px';
    element.style.backgroundColor = 'green';
    element.style.color = 'white';
    element.style.position = 'absolute';
    element.style.top = '25%';
    element.style.left = '70%';
    element.style.transform = 'translate(-50%, -50%)';
    element.textContent = text;
    element.style.textAlign = 'center';
}
function waitForFeatureSelection(featuresList, nodeName) {
    return new Promise(function(resolve) {
        // Function to handle button click
        function handleClick(event) {
            const feature = event.target.textContent;
            // Remove button event listeners
            removeButtons(document.getElementById(nodeName));
            // Resolve the Promise with the selected feature
            resolve(feature);
        }

        // Attach event listeners to feature buttons
        featuresList.forEach(function(feature) {
            var button = document.getElementById(feature);
            console.log("Feature is: " + feature);

            if(button == null){
                console.log("button is null!");
            }

            button.addEventListener('click', handleClick);
        });
    });
}
function styleButtons(featureWrapper, rootNodeElement, featuresList) {
    for (let i = 0; i < featuresList.length; i++) {
        let button = document.createElement('button');
        button.textContent = featuresList[i];
        button.onclick = function() {
            featureWrapper.feature = featuresList[i];
            rootNodeElement.remove();
        };
        rootNodeElement.appendChild(button);
    }
}


export { Animal, DecisionNode, LeafNode, DecisionTree, styleButtons };