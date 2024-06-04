//this function will load animals, called from the html, you can obtain the list of data by the getters and setters
/** 
function loadAnimals() {
    const csvPath = 'http://127.0.0.1:8000/static/animals.csv';
    const animals = [];

    fetch(csvPath)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const headers = lines[0].split(',');

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',');
                const animal = {};

                animal.classification = values[0].trim();
                animal.canFly = values[1].trim() === '1';
                animal.canSwim = values[2].trim() === '1';
                animal.hasFur = values[3].trim() === '1';
                animal.hasScales = values[4].trim() === '1';
                animal.numLimbs = parseInt(values[5].trim());
                animal.weight = parseInt(values[6].trim());

                animals.push(animal);
            }

            console.log(animals);
        })
        .catch(error => {
            console.error('Error loading CSV file:', error);
        });
}
function getAnimals() { //getter is still not properly functional, same with setter
    return animals;
}

function setAnimals(newAnimals) {
    animals = newAnimals;
} */


function loadAnimals() {
    let combinedArray = Animal.loadAnimalsFromCSV();
    return combinedArray;
}

const animalsCSV = `name,classification,canFly,canSwim,hasFur,hasScales
dog,mammal,0,1,1,0
eagle,bird,1,0,0,0,
snake,reptile,0,1,0,1
piranha,fish,0,1,0,1`;

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

    static loadAnimalsFromCSV() {
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

function displayRandomAnimals() {
    let animalArray = Animal.loadAnimalsFromCSV();

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
}

function showAnimal(animalObj) {

    var textBox = document.getElementById('text');
    if (textBox == null) {
        console.log("textBox is null");
    }

    // textBox.textContent = textBox.textContent + "\n\n" + animalObj.toString();
    if (textBox.textContent.length == 0) {
        textBox.innerHTML = animalObj.features['name'];
    }
    else {
        textBox.innerHTML += "<br>" + animalObj.features['name'];
    }


}
