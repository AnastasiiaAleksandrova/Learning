module.exports = class LinkedList {
	
	constructor() {
		this.head = null
		this.tail = null
	}
	
	getElement(index) {
		let cpos = 0;
	
		for (let node = this.head; node != null; node = node.next) {
			if (cpos == index) {
				return node.value
			}
			cpos++
		} 				
	}
	
	// Stack implementation
	
	pop() {
		console.log(this)
		if (!this.isEmpty()) {
			let value = this.getElement(0);
			console.log(value)
			this.removeAt(0);
			return value;
		}
	}
	
	push(value) {
		this.addToHead(value)
	}
	
	
	insertAt_(index, value) {
		
		if (index == 0) {
			this.addToHead(value)
		}

		let node = this.head

		while (node != null) {
			if (index-- == 0) {
				let newNode = LinkedListNode(value)
				newNode.prev = node.prev
				newNode.next = node
				
				newNode.prev.next = newNode
				newNode.next.prev = newNode
			}
			
			node = node.next
		}
		
		if (node == null && index == 0) {
			this.addToTail(value)
		}
	}
	
	insertAt(index, value) {
		let cpos = 0;
		let newElem = new LinkedListNode(value);
		
		for (let node = this.head; node != null; node = node.next) {
			if (cpos == index) {
				if (node == this.head) {
					this.addToHead(value)
			        return
				} else {
				    node.prev.next = newElem;
				    newElem.prev = node.prev;
				    newElem.next = node;
				    node.prev = newElem;
				    return	
				}	
			} 
			if (cpos + 1 == index && node == this.tail) {
			    this.addToTail(value)
				return
				}
            cpos++;			
		} 				
	}
	
	removeAt(index) {
		let cpos = 0;
	
		for (let node = this.head; node != null; node = node.next) {
			if (cpos++ == index) {
				if (node == this.tail) {
					this.deleteFromTail();
					break
				}
				else if (node == this.head) {
					this.deleteFromHead();
					break
				}
				else {
					node.prev.next = node.next;
				    node.next.prev = node.prev;
				    break
				}
			}
		} 
	}
	
	sublist(from, size) {
		let cpos = 0;
		let copy = new LinkedList();
		let to = from + size;
	
		for (let node = this.head; node != null; node = node.next) {
			if (cpos >= from && cpos < to) {
				copy.addToTail(node.value)
			}
			cpos++
		}
		return copy
	}
	
	contains(value) {
	
		for (let node = this.head; node != null; node = node.next) {
			if (node.value === value) {
				return true
			}
		}
		return false
	}
	
	findElement(value) {
		let cpos = 0;
	
		for (let node = this.head; node != null; node = node.next) {
			if (node.value === value) {
				return cpos
			}
			cpos++
		}
		return -1
	}
	
	addToTail(value) {
		let node = new LinkedListNode(value)
		
		if (this.tail == null) {
			this.head = node
			this.tail = node
		} else {
			this.tail.next = node
			node.prev      = this.tail
			this.tail      = node
		}
	}
	
	
	deleteFromTail() {
		if (this.tail == null) {
			return
		}
        
        let node = this.tail

        if (this.head == this.tail) {
            this.head = null
            this.tail = null
        } else {
            this.tail = node.prev
			this.tail.next = null
        }	
        return node.value		
	}
	
	clear() {
		this.head = null
		this.tail = null
	}
	
	isEmpty() {
		return this.head == null;
	}
	
	add(value) {
		this.addToTail(value);
	}
	
	
	addToHead(value) {
		let node = new LinkedListNode(value)
		
		if (this.head == null) {
			this.head = node
			this.tail = node
		} else {
			this.head.prev = node
			node.next      = this.head
			this.head      = node
		}
	}
	
	
	deleteFromHead() {
		if (this.head == null) {
			return
		}
		
		let node = this.head
		
		if (this.head == this.tail) {
			this.head = null
			this.tail = null
		} else {
			this.head = node.next
			this.head.prev = null
		}
		
		return node.value
	}
	
	size() {
		let size = 0;
	
		for (let node = this.head; node != null; node = node.next) {
			size++
		} 			
			
		return size;
	}
	
	first() {
		if (this.head != null) 
			return this.head.value
	}
	
	last() {
		if (this.tail != null)
			return this.tail.value
	}
}

class LinkedListNode {

	constructor(value) {
		this.value = value
		this.next = null
		this.prev = null
	}

}
