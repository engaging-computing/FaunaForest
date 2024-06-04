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

}

class LeafNode {

    constructor(classification) {
        this.classification = classification;
    }    

}

class DecisionTree {

    constructor(rootDecisionNode) {
        this.root = rootDecisionNode;
    }

    buildTree() {

        // prompt to create root decision node 
        var rootFeature = prompt("What feature should we consider first?");
        var rootNode = new DecisionNode(rootFeature);

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
    }

    defineSplit(feature) {
        tempDecisionNode = new DecisionNode(feature);
        return tempDecisionNode;
    }

    defineLeaf(classification) {
        tempLeafNode = new LeafNode(classification);
        return tempLeafNode;
    }

}