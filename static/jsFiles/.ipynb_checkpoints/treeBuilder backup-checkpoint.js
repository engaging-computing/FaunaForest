
let treeNodes = [];
let trees = [];
var counter = 0;

// TODO: Need to add way for user to delete node or undo what they just did 
// TODO: Some of the buttons are not clickable 

function addDecisionNode(decision) {
    let newNode = new DecisionNode(decision);
    treeNodes.push(newNode);

    // testing purposes 
    // console.log("Expected: decision node. Actual: " + typeof newNode);

    // root node 
    if (treeNodes.length == 1) {
        tree = new DecisionTree(newNode);
        styleDecisionNode(decision, treeNodes.length);
    }
    else if (treeNodes.length > 7) { // trying to add decision node at bottom level 
        // throw error
        // delete the erroneous node 
        treeNodes.splice(treeNodes.length - 1, 1)
    }
    else { // non-root node 
        var parentIndex = (Math.floor((treeNodes.indexOf(newNode) + 1) / 2)) - 1;

        if ((treeNodes.indexOf(newNode) + 1) % 2 == 0) { // left child 
            if (treeNodes[parentIndex].isDecisionNode) {
                treeNodes[parentIndex].left = newNode;
                styleDecisionNode(decision, treeNodes.length);
            }
            else {
                // throw error
                // delete the erroneous node 
                treeNodes.splice(treeNodes.length - 1, 1)
            }
        }
        else { // right child 
            if (treeNodes[parentIndex].isDecisionNode) {
                treeNodes[parentIndex].right = newNode;
                styleDecisionNode(decision, treeNodes.length);
            }
            else {
                // throw error 
                // delete the erroneous node 
                treeNodes.splice(treeNodes.length - 1, 1)
            }
        }
    }
    console.log(treeNodes);

    var nextNode = treeNodes.length + 1;
    var nextParent = Math.floor(nextNode / 2);

    // while next parent is leaf
        // pick next node 
        // find parent of next node 

    while ((treeNodes[nextParent - 1] == null) || (!treeNodes[nextParent - 1].isDecisionNode)) {
        nextNode++;
        nextParent = Math.floor(nextNode / 2);
        // push dummy node to array 
        treeNodes.push(null);
    }
    
    return nextNode - 1;
}

function addLeafNode(classification) {
    let newNode = new LeafNode(classification);
    treeNodes.push(newNode);

    // testing purposes 
    // console.log("Expected: leaf node. Actual: " + typeof newNode);

    var parentIndex = (Math.floor((treeNodes.indexOf(newNode) + 1) / 2)) - 1;

    if (treeNodes.length == 1) { // trying to add leaf at root 
        // remove the leaf node 
        treeNodes.splice(treeNodes.length - 1, 1);
        return 0;
        // throw error 
    }
    else if ((treeNodes.indexOf(newNode) + 1) % 2 == 0) { // left child 
        if (treeNodes[parentIndex].isDecisionNode) {
            treeNodes[parentIndex].left = newNode;
            styleLeafNode(classification, treeNodes.length);
        }
        else {
            // throw error 
            // delete the erroneous node 
            treeNodes.splice(treeNodes.length - 1, 1)
        }
    }
    else { // right child 
        if (treeNodes[parentIndex].isDecisionNode) {
            treeNodes[parentIndex].right = newNode;
            styleLeafNode(classification, treeNodes.length);
        }
        else {
            // throw error 
            // delete the erroneous node 
            treeNodes.splice(treeNodes.length - 1, 1)
        }
    }
    console.log(treeNodes);

    var nextNode = treeNodes.length + 1;
    var nextParent = Math.floor(nextNode / 2);

    // while next parent is leaf
        // pick next node 
        // find parent of next node 

    while (((treeNodes[nextParent - 1] == null) || (!treeNodes[nextParent - 1].isDecisionNode)) && (treeNodes.length <= 15)) {
        nextNode++;
        nextParent = Math.floor(nextNode / 2);
        // add dummy node to array 
        treeNodes.push(null);
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
    // save current tree 
    let deepCopyArray = JSON.parse(JSON.stringify(treeNodes));
    trees.push(deepCopyArray);
    // empty treeNodes for use by next tree 
    while (treeNodes.length > 0) {
        treeNodes.pop();
    }

    console.log(treeNodes);
    console.log(trees);
    console.log(trees[0]);

    // reset UI 
    document.body.innerHTML = initialContent;
    
}
