const list = require('./linkedlist')

module.exports = class Hashtable {

	constructor(nBuckets) {
		this.buckets = new Array(nBuckets).fill(null);
	}

	get(key) {
		let bucketId = hash(key, this.buckets.length);
		let list = this.buckets[bucketId];
		if (list == null) {
			return;
		}

		let iterator = list.iterator();
		while (iterator.hasNext()) {
			let keyValue = iterator.next();
			if (keyValue.key == key) {
				return keyValue.val;
			}
		}
	}

	put(key, val) {
		let bucketId = hash(key, this.buckets.length);
		let keyValue = new KeyValue(key, val);
		if (this.buckets[bucketId] == null) {
			this.buckets[bucketId] = new list();
		}
		this.buckets[bucketId].push(keyValue);
	}
}

function hash(key, n) {
	let sum = 0;
	for (let i = 0; i < key.length; i++) {
		sum += key.charCodeAt(i) * 31;
	}
	return sum % n;
}

class KeyValue {

	constructor(key, val) {
		this.key = key;
		this.val = val;
	}

}
