const list = require('./linkedlist')
const tree = require('./binarytree')
const fsys = require('fs')
const hash = require('./hashtable')

let h = new hash(1000);

h.put("Dima", 33);
h.put("Nastya", 31);
console.log(h.get("Dima"));

//console.log(testTree.remove(24));

//console.log(testTree);

//testTree.bft(v => {
	
	//console.log(`Visiting ${v}`)
	
//})



function init_coll(coll, size) {
	coll.clear()
	
	for (let i = 0; i < size; i++) {
		// coll.add(Math.random())
		coll.add(1)
	}
}

function test_coll(coll, filePath) {
	
	const n = 1000
	
	if (fsys.existsSync(filePath)) {
		fsys.unlinkSync(filePath)
	}
	
	for (let size = 100; size <= 10000; size += 100) {
		init_coll(coll, size)

		let time = 0
		for (let i = 0; i < n; i++) {
			let value = 0 //Math.random()
			
			let start = Date.now()
			
			coll.contains(value)
			
			time += Date.now() - start
		}
		
		fsys.appendFileSync(filePath, size + ',' + time + ';\n')
	}

}

function randInt(limit) {
	return Math.floor(Math.random() * limit)
}

function test_list() {
	test_coll(new list(), "list_stat.csv")
}

function test_tree() {
	test_coll(new tree(), "tree_stat.csv")
}


//test_list()
//test_tree()



