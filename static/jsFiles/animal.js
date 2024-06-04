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