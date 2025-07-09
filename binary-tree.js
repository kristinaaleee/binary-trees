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


    _getsucc(succ) {
        console.log(succ)
       // Find next closest element value in right tree
        succ = succ.right;

        // Steps down to number closest to deleted value in right tree
        while (succ !== null && succ.left !== null) {
            succ = succ.left;
        }
        return succ;
    }

    insert(value, root = this.root){
        if (root === null) return new Node(value);
        
        if (root.data === value) return root;

        if (value < root.data)  root.left = this.insert(value, root.left);

        else if (value > root.data) root.right = this.insert(value, root.right);

        return root;
    }
    
    delete(value, root = this.root){
        if (root === null) return root;

        //Search tree for value
        if (value < root.data) root.left = this.delete(value, root.left);

        else if (value > root.data) root.right = this.delete(value, root.right);

        // Delete by returning root below 
        else{

            // Delete root only has right child
            if(root.left === null) return root.right

            // Delete root only has left child
            if(root.right === null) return root.left

            let succ = this._getsucc(root);

            //Overwrite root with new successor
            root.data = succ.data;
            root.right = this.delete(succ.data, root.right);
        }

        return root;
    }

    find(value){
        let root = this.root
        while (root != null){
            if (value === root.data) return root
            if (value < root.data) root = root.left
            else if (value > root.data) root = root.right
        }
        return null
    }

    levelOrderRec(callback, root = this.root, level = 0, result = []){
        // Require callback function
        if (!callback) throw new Error('Must include callback function!')

        // Base case
        if (root === null) return;

        // Add new array for each level of tree
        if (result.length <= level) result.push([]);

        // Apply callback to each node
        result[level].push(callback(root.data));

        this.levelOrderRec(callback, root.left, level + 1, result);
        this.levelOrderRec(callback, root.right, level + 1, result);

        return result;
    }

    levelOrderIte(callback, root = this.root){
        if (!callback) throw new Error('Must include callback function!')
        if (root === null) return [];

        let queue = [];
        let result = [];

        queue.push(root)
        let level = 0;

        while (queue.length > 0){
            let len = queue.length;
            result.push([])

            for (let i = 0; i < len; i++){
                // Selects first node and deletes
                let node = queue.shift();
                result[level].push(callback(node.data))

                // If branches exist, push into queue and repeat
                if (node.left != null) queue.push(node.left)

                if (node.right != null) queue.push(node.right)
            }
            level++
        }
        return result; 
    }

    inOrder(callback, root = this.root, result = []){
        if (!callback) throw new Error('Must include callback function!')
        if (root === null) return;

        // Left Root Right
        this.inOrder(callback, root.left, result);
        result.push(callback(root.data))
        this.inOrder(callback, root.right, result);

        return result;
    }

    preOrder(callback, root = this.root, result = []){
        if (!callback) throw new Error('Must include callback function!')
        if (root === null) return;

        // Root Left Right
        result.push(callback(root.data));
        this.preOrder(callback, root.left, result);
        this.preOrder(callback, root.right, result);

        return result;
    }

    postOrder(callback, root = this.root, result = []){
        if (!callback) throw new Error('Must include callback function!')
        if (root === null) return;

        // Left Right Root

        this.postOrder(callback, root.left, result);
        this.postOrder(callback, root.right, result);
        result.push(callback(root.data));

        return result;
    }
    
    height(value, root = this.root, tempHeight = 0){
        if (root === null) return;

        

    }

    depth(value){
        // Distance from root
        let root = this.root
        let depth = 0;
        while (root != null){
            if (value === root.data) return depth;

            if (value < root.data) {
                depth++
                root = root.left
            }

            else if (value > root.data) {
                depth++
                root = root.right
            }
        }
        return null
    }
    
    
}

function buildTree(array){
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

function test(x){
    return x + 1
}

let sampleArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(sampleArray)
console.log(tree.root);
prettyPrint(tree.root);
// console.log(tree.levelOrderRec(test))
// console.log(tree.levelOrderIte(test))
// console.log(tree.inOrder(test))
// console.log(tree.preOrder(test))
// console.log(tree.postOrder(test))
// console.log(tree.height(5))





