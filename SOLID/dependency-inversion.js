/**
 * The "Dependency Injection" doesn't have anything directly to do
 * with "Dependency Inversion".
 *
 * It states that, high level modules such as Research class should not
 * directly depend on low level modules, such az Relationships class.
 *
 * High level module should not depend on low level modules.
 *
 * The Dependency Inversion basically defines a relationship that
 * you should have between low level modules and high level modules.
 *
 *
 */



let Relationship = Object.freeze({
    parent: 0,
    child: 1,
    sibling: 2,
})

class Person {
    constructor(name) {
        this.name = name;
    }
}

// LOW-LEVEL MODULE (many store ways)
class RelationshipBrowser {
    constructor() {
        if (this.constructor.name === 'RelationshipBrowser') {
            throw new Error('RelationshipBrowser is abstract!');
        }
    }

    findAllChildrenOf(name) {

    }
}

class Relationships extends RelationshipBrowser {
    constructor() {
        super();
        this.data = [];
    }

    addParentAndChild(parent, child) {
        this.data.push({
            from: parent,
            type: Relationship.parent,
            to: child,
        })
    }

    findAllChildrenOf(name) {
        return this.data.filter(r =>
            r.from.name === name &&
            r.type === Relationship.parent
        ).map(r => r.to);
    }
}

// HIGH-LEVEL MODULE (should not directly depend on Relationships, and should not contact private data)
class Research {
    // constructor(relationships) {
    //     // find all children of John
    //     let relations = relationships.data;
    //     for (let rel of relations.filter(r =>
    //         r.from.name === 'John' && r.type === Relationship.parent
    //     )) {
    //         console.log(`John has a child name ${rel.to.name
    //         }`);
    //     }
    // }
    constructor(browser) {
        for (let p of browser.findAllChildrenOf('John')) {
            console.log(`John has a child called ${p.name}`);
        }
    }
}


let parent = new Person('John');
let child1 = new Person('Chris');
let child2 = new Person('Matt');

let rels = new Relationships();
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

new Research(rels);
