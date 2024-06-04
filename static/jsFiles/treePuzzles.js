
export default class Puzzle {

    // constructor to create a puzzle object 
    constructor(featuresList, correctFeatures, leavesList) {
        this.options = featuresList; // feature options for user to choose from 
        this.features = correctFeatures; // list of features  
        this.leaves = leavesList; // list of leaves 
    }

    // this function compares user's selections and the features to calculate the accuracy 
    checkAccuracy(selections) {
        // check selections against features 
        var mistakes = 0;
        /** 
        for (let i = 0; i < this.features.length; i++) {
            if (selections[i] != this.features[i]) {
                mistakes++;
            }
        } */

        for (let i = 0; i < this.features.length; i++) {
            if (decisionNodesList[i] != null) {
                if (selections[i] != this.features[i]) {
                    mistakes++;
                }
            }
        }

        // find and return accuracy 
        return ((this.features.length - mistakes) / (1.0 * this.features.length)) * 100.0;
    }

    static loadPuzzles(varFilename) {
        let puzzlesList = [];

        const lines = varFilename.trim().split('\n');

        for (let i = 0; i < lines.length / 4; i+=4) {
            // lines[i] is list of feature options
            let allOptions = lines[i].trim().split(',');

            // lines[i + 1] is list of correct features
            let correctFeatures = lines[i+1].trim().split(',');

            // lines[i + 2] is list of leaves 
            let leaves = lines[i+2].trim().split(',');

            let puzzleTemp = new Puzzle(allOptions, correctFeatures, leaves);
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


