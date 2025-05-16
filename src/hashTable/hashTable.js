var HashTable = /** @class */ (function () {
    function HashTable(keys, values) {
        this.count = 0;
        this.size = 53;
        this.items = new Array(this.size);
        if (keys && values) {
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = values[i];
                this.items[i] = { key: key, value: value };
                this.count++;
            }
        }
    }
    HashTable.prototype.deleteItem = function (i) {
        this.items.splice(i, 1);
        this.size--;
    };
    HashTable.prototype.hash = function (key, numBuckets) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            var char = key[i];
            hash = ((hash << 5) - hash) + char.charCodeAt(0);
            hash = hash & hash;
        }
        hash %= numBuckets;
        return hash;
    };
    HashTable.prototype.getHash = function (key, numBuckets, i) {
        var a = this.hash(key, numBuckets);
        var b = this.hash(key, numBuckets);
        return (a + (i * (b + 1))) % numBuckets;
    };
    HashTable.prototype.insert = function (key, value) {
        var hash = this.getHash(key, this.size, 0);
        this.items[hash] = { key: key, value: value };
        return { key: key, value: value };
    };
    HashTable.prototype.search = function (key) {
        var hash = this.getHash(key, this.size, 0);
        var item = this.items[hash];
        return item.value;
    };
    return HashTable;
}());
var ht = new HashTable();
ht.insert('name', 'bill');
var n = ht.search('name');
console.log(n);
