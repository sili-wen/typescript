class HashTable {
    private items: Record<string, string>[];
    private count: number = 0;
    private size: number = 53;

    constructor();
    constructor(keys?: string[], values?: string[]) {
      this.items = new Array(this.size);
      
      if (keys && values) {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const value = values[i];
          
          this.items[i] = { key, value };
          this.count++;
        }
      }
    }

    deleteItem(i: number) {
      this.items.splice(i, 1);
      this.size--;
    }

    hash(key: string, numBuckets: number): number {
      let hash = 0
      for (let i = 0; i < key.length; i++) {
        const char = key[i];
        hash = ((hash << 5) - hash) + char.charCodeAt(0);
        hash = hash & hash;
      }
      
      hash %= numBuckets
      return hash
    }

    getHash(key: string, numBuckets: number, i: number): number {
      const a = this.hash(key, numBuckets)
      const b = this.hash(key, numBuckets)

      return (a + (i * (b+1))) % numBuckets
    }

    insert(key: string, value: string) {
      const hash = this.getHash(key, this.size, 0)
      this.items[hash] = { key, value }
      return { key, value }
    }

    search(key: string): string {
      const hash = this.getHash(key, this.size, 0)
      const item = this.items[hash]

      return item.value
    }
}


const ht = new HashTable()
ht.insert('name', 'bill')
const n = ht.search('name')
console.log(n)