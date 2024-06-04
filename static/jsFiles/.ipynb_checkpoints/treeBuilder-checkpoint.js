
//let treeNodes[counter] = [];
let treeNodes = [[], [], [], [], []]; // supports 5 trees 
var counter = 0; // will correspond to index of trees we are working with 


// TODO: Need to add way for user to delete node or undo what they just did 
// TODO: Some of the buttons are not clickable 

function addDecisionNode(decision) {
    let newNode = new DecisionNode(decision);
    treeNodes[counter].push(newNode);

    // testing purposes 
    // console.log("Expected: decision node. Actual: " + typeof newNode);

    // root node 
    if (treeNodes[counter].length == 1) {
        tree = new DecisionTree(newNode);
        styleDecisionNode(decision, treeNodes[counter].length);
    }
    else if (treeNodes[counter].length > 7) { // trying to add decision node at bottom level 
        // throw error
        // delete the erroneous node 
        treeNodes[counter].splice(treeNodes[counter].length - 1, 1)
    }
    else { // non-root node 
        var parentIndex = (Math.floor((treeNodes[counter].indexOf(newNode) + 1) / 2)) - 1;

        if ((treeNodes[counter].indexOf(newNode) + 1) % 2 == 0) { // left child 
            if (treeNodes[counter][parentIndex].isDecisionNode) {
                treeNodes[counter][parentIndex].left = newNode;
                styleDecisionNode(decision, treeNodes[counter].length);
            }
            else {
                // throw error
                // delete the erroneous node 
                treeNodes[counter].splice(treeNodes[counter].length - 1, 1)
            }
        }
        else { // right child 
            if (treeNodes[counter][parentIndex].isDecisionNode) {
                treeNodes[counter][parentIndex].right = newNode;
                styleDecisionNode(decision, treeNodes[counter].length);
            }
            else {
                // throw error 
                // delete the erroneous node 
                treeNodes[counter].splice(treeNodes[counter].length - 1, 1)
            }
        }
    }
    console.log(treeNodes[counter]);

    var nextNode = treeNodes[counter].length + 1;
    var nextParent = Math.floor(nextNode / 2);

    // while next parent is leaf
        // pick next node 
        // find parent of next node 

    while ((treeNodes[counter][nextParent - 1] == null) || (!treeNodes[counter][nextParent - 1].isDecisionNode)) {
        nextNode++;
        nextParent = Math.floor(nextNode / 2);
        // push dummy node to array 
        treeNodes[counter].push(null);
    }
    
    return nextNode - 1;
}

function addLeafNode(classification) {
    let newNode = new LeafNode(classification);
    treeNodes[counter].push(newNode);

    // testing purposes 
    // console.log("Expected: leaf node. Actual: " + typeof newNode);

    var parentIndex = (Math.floor((treeNodes[counter].indexOf(newNode) + 1) / 2)) - 1;

    if (treeNodes[counter].length == 1) { // trying to add leaf at root 
        // remove the leaf node 
        treeNodes[counter].splice(treeNodes[counter].length - 1, 1);
        return 0;
        // throw error 
    }
    else if ((treeNodes[counter].indexOf(newNode) + 1) % 2 == 0) { // left child 
        if (treeNodes[counter][parentIndex].isDecisionNode) {
            treeNodes[counter][parentIndex].left = newNode;
            styleLeafNode(classification, treeNodes[counter].length);
        }
        else {
            // throw error 
            // delete the erroneous node 
            treeNodes[counter].splice(treeNodes[counter].length - 1, 1)
        }
    }
    else { // right child 
        if (treeNodes[counter][parentIndex].isDecisionNode) {
            treeNodes[counter][parentIndex].right = newNode;
            styleLeafNode(classification, treeNodes[counter].length);
        }
        else {
            // throw error 
            // delete the erroneous node 
            treeNodes[counter].splice(treeNodes[counter].length - 1, 1)
        }
    }
    console.log(treeNodes[counter]);

    var nextNode = treeNodes[counter].length + 1;
    var nextParent = Math.floor(nextNode / 2);

    // while next parent is leaf
        // pick next node 
        // find parent of next node 

    while (((treeNodes[counter][nextParent - 1] == null) || (!treeNodes[counter][nextParent - 1].isDecisionNode)) && (treeNodes[counter].length <= 15)) {
        nextNode++;
        nextParent = Math.floor(nextNode / 2);
        // add dummy node to array 
        treeNodes[counter].push(null);
    }

    return nextNode - 1;
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
        this.isDecisionNode = true;
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

    /** 
    isDecisionNode() {
        return true;
    } */

}

class LeafNode {

    constructor(classification) {
        this.classification = classification;
        this.isDecisionNode = false;
    }    

    /** 
    isDecisionNode() {
        return false;
    } */

}

class DecisionTree {

    constructor(rootDecisionNode) {
        this.root = rootDecisionNode;
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
        while(currNode.isDecisionNode) {

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

function getTreeNodes() {
    return treeNodes;
}





function nextTree() {
    closePanel();
    counter++;

    console.log(treeNodes[counter - 1]);
    console.log(treeNodes);

    // reset UI 
    document.body.innerHTML = initialContent;
    
}
