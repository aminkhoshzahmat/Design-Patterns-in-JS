class ObjectBuilder {
    generatedClass = ''
    className = ''
    fields = []

    constructor(className) {
        this.generatedClass = this.getClassWithoutConstructor(className)
        this.className = className
    }

    getClassWithoutConstructor(className) {
        return `class ${className} { }`
    }

    getClassWithFields(className) {
        return `class ${className} {
            constructor(${ this.fields.map((field, index) => `${index > 0 ? ' ': ''}${field}`)}) {
                ${ this.fields.map((field) => 
            `this.${field} = ${field};`).join('\n') }
            }
        }`
    }

    addField(name) {
        this.fields.push(name)
        return this
    }

    toString() {
        if (this.fields.length === 0)
            return this.generatedClass

        return this.getClassWithFields(this.className)
    }
}
let ob = new ObjectBuilder('Person')
ob.addField('name').addField('age');
console.log(ob.toString());
