/**
 * Motivation
 *      - Some objects are simple and can be created in a single initializer call,
 *        Other objects require a lot of ceremony to create
 *      - Having an object with 10 initializer arguments is not productive
 *      - Instead, opt for piecewise construction
 *      - Builder provides an API for constructing an object step-by-step
 * Definition
 *      - When piecewise object construction is complicated,
 *        provide an API for doing it succinctly.
 */

class Tag
{
    // static indentSize = 2;
    static get indentSize() { return 2; }

    constructor(name='', text='')
    {
        this.name = name;
        this.text = text;
        this.children = [];
    }

    toStringImpl(indent)
    {
        let html = [];
        let i = ' '.repeat(indent * Tag.indentSize);
        html.push(`${i}<${this.name}>\n`); // start root

        if (this.text.length > 0) // check if root has text
        {
            html.push(' '.repeat(Tag.indentSize * (indent+1)));
            html.push(this.text);
            html.push('\n');
        }

        for (let child of this.children) // generate children
            html.push(child.toStringImpl(indent+1));

        html.push(`${i}</${this.name}>\n`); // end root
        return html.join('');
    }

    toString()
    {
        return this.toStringImpl(0);
    }

    /**
     * Instead of creating new instance separately from HtmlBuilder...,
     * but this does introduce coupling, now we have bidirectional dependency between builder as wel as the object.
     * This is violation of open/close principle, what if another builder instructed.
     */
    static create(name)
    {
        return new HtmlBuilder(name);
    }
}

class HtmlBuilder
{
    constructor(rootName)
    {
        this.root = new Tag(rootName);
        this.rootName = rootName;
    }

    // non-fluent
    addChild(childName, childText)
    {
        let child = new Tag(childName, childText);
        this.root.children.push(child);
    }

    // fluent
    addChildFluent(childName, childText)
    {
        let child = new Tag(childName, childText);
        this.root.children.push(child);
        return this;
    }

    toString()
    {
        return this.root.toString();
    }

    clear()
    {
        this.root = new Tag(this.rootName);
    }

    build()
    {
        return this.root;
    }
}

// just a single paragraph using string concatenation
const hello = 'hello';
let html = [];
html.push('<p>');
html.push(hello);
html.push('</p>');
console.log(html);
console.log(html.join(''));

// a list with 2 words in it
const words = ['hello', 'world'];
html = [];
html.push('<ul>\n');
for (let word of words)
    html.push(`  <li>${word}</li>\n`);
html.push('</ul>');
console.log(html.join(''));

// ordinary non-fluent builder
//let builder = new HtmlBuilder('ul');
let tagBuilder = Tag.create('ul');
for (let word of words)
    tagBuilder.addChild('li', word);
//console.log(builder.toString());
let tag = tagBuilder.build();
console.log(tag.toString());

// fluent builder
tagBuilder.clear();
tagBuilder
    .addChildFluent('li', 'foo')
    .addChildFluent('li', 'bar')
    .addChildFluent('li', 'baz');
console.log(tagBuilder.toString());
