
const fs = require('fs')


function arrayFactory(n) {
  return {
    array: new Array(n).fill(0),
    printIt(){
      console.log(this.array)
    },
    removeElem(index) {
      let resultArr = [];
      for (let i = 0; i < this.array.length; i++) {
        if (i !== index) {
          resultArr.push(this.array[i])
        }
      }
      this.array = resultArr; 
    },
    insertElem(index, elem) {
      let resultArr = [];
      for (let i = 0; i < this.array.length; i++) {
        if (i === index) {
          	resultArr.push(elem)
        }
        
        resultArr.push(this.array[i])
      }
      this.array = resultArr;
      return this.array;
    },
    findElem(value){
      for (let i = 0; i < this.array.length; i++) {
        if (this.array[i] === value) {
          return i;  
        }
      }
      return -1;
      },
	takeElem(index) {
	  return this.array[index]  		
	  } 
    }
  }  

// size - size of array
// n    - number of experiments
// returns average time for get
function array_get_test(size, n) {
	let arr = arrayFactory(size);
	
	let start = Date.now();
	
	for (let i = 0; i < n; i++) {
		
		let position = Math.floor(Math.random() * size);
		
		arr.takeElem(position);
	}

	return Date.now() - start;
}

function run_array_get_test(filePath) {

	let n = 100

	fs.unlinkSync(filePath)

	for (let size = 100; size < 100000; size += 100) {
		
		let time = array_get_test(size, n)
		
		fs.appendFileSync(filePath, size + ',' + time + ';\n', (err) => {
			if (err) console.log(err)
		})
	}
}

function array_add_test(size, n) {
	let arr = arrayFactory(size);
	
	let start = Date.now();
	
	for (let i = 0; i < n; i++) {
		
		let position = Math.floor(Math.random() * size);
		
		arr.insertElem(position, 13);
	}
    
	return Date.now() - start	
}

function run_array_add_test(filePath) {
	
	let n = 100

	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath)
	}

	for (let size = 100; size < 100000; size += 100) {
		
		let time = array_add_test(size, n)
		
		fs.appendFileSync(filePath, size + ',' + time + ';\n', (err) => {
			if (err) console.log(err)
		})
	}
	
}

run_array_get_test('array_get_test_results.txt')
run_array_add_test('array_add_test_results.txt')
