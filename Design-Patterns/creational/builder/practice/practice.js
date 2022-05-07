class Tag {

    static get indentSize() {
        return 2;
    }

    constructor(name = '', text = '') {
        this.name = name;
        this.text = text;
        this.children = [];
    }

    toStringImpl(indent) {
        let i = ' '.repeat(indent * Tag.indentSize);
        let html = [];
        html.push(`${i}<${this.name}>\n`);

        if (this.text.length > 0) {
            html.push(' '.repeat((indent + 1) * Tag.indentSize));
            html.push(this.text);
            html.push('\n');
        }

        for (let child of this.children) {
            html.push(child.toStringImpl(indent + 1));

        }

        html.push(`${i}</${this.name}>\n`);
        // return html;
        return html.join('');
    }

    toString() {
        return this.toStringImpl(0);
    }

    static createBuilder(name) {
        return new TagBuilder(name);
    }
}


class TagBuilder {
    constructor(rootName) {
        this.root = new Tag(rootName);
        this.rootName = rootName;
    }

    addChild(name, text) {
        let child = new Tag(name, text)
        this.root.children.push(child);
        return this;
    }

    toString() {
        return this.root.toString();
    }

    clear() {
        this.root = new Tag(this.rootName)
    }

    build() {
        return this.root;
    }
}

let tb = Tag.createBuilder('ul');
tb.addChild('li', '1')
    .addChild('li', '2')
    .addChild('li', '3')
console.log(tb.toString());


// issues
// root can't have text!
