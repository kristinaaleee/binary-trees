import { mergeSort } from "../recursion/merge.js"

class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null; 
    }
}

class Tree{
    constructor(array){
        this.array = array;
        this.root = buildTree(array); 
    }

    insert(value, root = this.root){
        let currentNode = root
        console.log(currentNode)

        if (currentNode === null) return currentNode = new Node(value);

        if (currentNode.data === value) return this.root;

        if (value < currentNode.data)  this.insert(value, currentNode.left)

        else if (value > currentNode.data) this.insert(value, currentNode.right)

        return currentNode
    }
    // methods that manipulate balanced tree from this.root
}

function buildTree(array){
    console.log('Running build..')
    // Sort array
    let sortedArray = mergeSort(array);

    // Remove duplicates
    let finalArray = sortedArray.filter((item, index) => {
        if (index === 0) return true;
        if (item != sortedArray[index - 1]) return true;
    })
    
    return recursiveTree(finalArray, 0, finalArray.length - 1);
}

// Recursive function to split array and set middle node as root
function recursiveTree(array, start, end){
    console.log('Running recursive..')
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2)

    let root = new Node(array[mid]);
    root.left = recursiveTree(array, start, mid - 1)
    root.right = recursiveTree(array, mid + 1, end);

    return root;
}

// Visual display of tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};


let sampleArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(sampleArray)
tree.insert(6);
prettyPrint(tree.root);

