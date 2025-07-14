import { Tree } from "./binary-tree.js"

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

// Callback function for testing
function test(x){
    return x;
}

// Generate Random Array
function arrayGenerator(limit, length){
  let array = [];
  while (array.length < length){
    array.push(Math.floor(Math.random() * limit))
  }
  return array;
}

// Arrays
let sampleArray = arrayGenerator(100, 10);
let addArray = arrayGenerator(100, 10);

// Original
const tree = new Tree(sampleArray);
console.log(tree.isBalanced());
prettyPrint(tree.root);

console.log(tree.levelOrderIte(test));
console.log(tree.inOrder(test));
console.log(tree.preOrder(test));
console.log(tree.postOrder(test));

// Add new numbers
addArray.forEach((number) => tree.insert(number));
console.log(tree.isBalanced());
prettyPrint(tree.root);


// Rebalance
tree.rebalance();
console.log(tree.isBalanced());
prettyPrint(tree.root);

console.log(tree.levelOrderRec(test));
console.log(tree.inOrder(test));
console.log(tree.preOrder(test));
console.log(tree.postOrder(test));

