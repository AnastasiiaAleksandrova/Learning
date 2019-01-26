const list = require('./linkedlist')

module.exports = class BinaryTree {
	
	constructor() {
		this.root = null;
	}
	
	add(value) {
		let node = new BinaryTreeNode(value);
		
		if (this.root != null) {
			let current = this.root;
			
			while (current !== null) {
				if (toLeft(current, value)) {
					if (current.left === null) {
						node.par = current;
						current.left = node;
						break;
					} else {
						current = current.left;
					}
				} else {
					if (current.right === null) {
						node.par = current;
						current.right = node;
						break;
					} else {
						current = current.right;
					}
				}
			}
		} else {
			this.root = node;
		}			
	}
	
	clear() {
		this.root = null;
	}
	

	remove(value) {
		let current = findNodeByValue(this, value);
		if (current != null) {
			removeNode(current);
			return true;
		}
		return false;
	}
	
	dft(callback) {
		traverse(this, callback, true);
	}
	
	bft(callback) {
		traverse(this, callback, false);
	}
	
	contains(value) {
		return findNodeByValue(this, value) != null;
	}
}

function traverse(tree, callback, isDft) {
	let queue = new list();
		
	if (tree.root != null) { 
		queue.addToTail(tree.root);
	}
		
	while (!queue.isEmpty()) {
		let node = queue.pop();
			
		callback(node.value)

		if (isDft) {
			if (node.right != null) {
				queue.addToHead(node.right);
			}
			if (node.left != null) {
				queue.addToHead(node.left);
			}
		} else {
			if (node.left != null) {
				queue.addToTail(node.left);
			}
			if (node.right != null) {
				queue.addToTail(node.right);
			}
		}
	}
}

function findNextNode(node) {
	if (node != null) {
		let temp = node.right
		
		if (temp != null) {
			while (temp != null && temp.left != null) {
				temp = temp.left
			}
		}
		
		return temp 
	}
}

function substituteChildNode(oldChild, newChild) {
	if (newChild !== null) {
		newChild.par = oldChild.par;
	}
	
	if (oldChild == oldChild.par.left) {
		oldChild.par.left = newChild;
	} else {
		oldChild.par.right = newChild;
	}
}

function removeNode(node) {
	if (node.left == null && node.right == null) {
		substituteChildNode(node, null);
	} else if (node.left != null && node.right == null) {
		substituteChildNode(node, node.left);
	} else if (node.left == null && node.right != null) {
		substituteChildNode(node, node.right);
	} else if (node.left != null && node.right != null) {
		let temp = findNextNode(node);
		node.value = temp.value;
		removeNode(temp);
	}
}

function findNodeByValue(tree, value) {
	let current = tree.root;
	while (current != null && current.value != value) {
		if (value <= current.value) {
			current = current.left;
		} else {
			current = current.right;
		}
	}
	return current;
}

function toLeft(node, value) {
	return value <= node.value;
}

class BinaryTreeNode {
	
	constructor(value){
		this.left  = null;
		this.right = null;
		this.par = null;
		this.value = value;
	}
	
}

