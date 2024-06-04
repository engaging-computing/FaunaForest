class Animal {

    // classification - String representing the classification (mammal, bird, fish, reptile)
    // name - String representing name of animal 
    // canFly - boolean representing whether or not animal can fly 
    // canSwim - boolean representing whether or not animal can swim 
    // hasFur - boolean representing whether or not animal has fur 
    // hasScales - boolean representing whether or not animal has scales
    // numLimbs - int representing number of limbs

    constructor(classificationStr, name, canFly, canSwim, hasFur, hasScales, numLimbs, weight) {

        features = {
            "strClassification" : classificationStr,
            "numClassification" : translateToNumber(classificationStr),
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

    loadAnimals(filename) {

        /**
         * 
         * 
         * document.getElementById('inputfile')
            .addEventListener('change', function () {
 
                let fr = new FileReader();
                fr.onload = function () {
                    document.getElementById('output')
                        .textContent = fr.result;
                }
 
                fr.readAsText(this.files[0]);
            })

         */

        const fs = require('fs')
        fs.readFile(filename, (err, fileData) => {
            if (err) throw err;
            console.log(fileData.toString());
        })

        // open file for reading 
        

        // read and discard header line 


        // for each line 
            // read line 
            // parse into tokens
            // create new animal object 
            // add new animal object to corresponding classification list 

    }

}

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