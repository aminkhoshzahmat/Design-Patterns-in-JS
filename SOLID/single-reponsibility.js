const fs = require('fs');

class Journal {
    constructor() {
        this.entries = {};
    }

    addEntry(text) {
        let c = ++Journal.count;
        let entry = `${c}: ${text}`
        this.entries[c] = entry;
        return c;
    }

    removeEntry(index) {
        delete this.entries[index];
    }

    toString() {
        return Object.values(this.entries).join('\n');
    }

    /**
     * Here is the logic which not related to Journal
     * Potential to implement the Single Responsibility
     */
    // save(filename) {
    //     fs.writeFileSync(filename, this.toString());
    // }
    //
    // load(filename) {
    //     //
    // }
    //
    // loadFromUrl(url) {
    //     //
    // }
}

class PersistenceManager {
    saveToFile(object, filename) {
        fs.writeFileSync(filename, object.toString());
    }
}


Journal.count = 0;

let j = new Journal();
j.addEntry('I cried today');
j.addEntry('I cried today');
console.log(j.toString());


let p = new PersistenceManager();
let filename = '/home/amin/Projects/github/desing-patterns-in-js/SOLID/journal.txt'
p.saveToFile(j, filename);

// God object
// Separation of concerns
