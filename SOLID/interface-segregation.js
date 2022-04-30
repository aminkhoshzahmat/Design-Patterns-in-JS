/**
 * ISP = segregate (split up)
 * JS doesn't have interfaces, JS uses doc type.
 */

class Document {

}

class Machine {
    constructor() {
        /**
         * make it abstract class,
         * this constructor has guard
         */
        if (this.constructor.name === 'Machine') {
            throw new Error('Machine is abstract!');
        }
    }

    print(doc) {
    }

    fax(doc) {

    }

    scan(doc) {

    }
}


class MultiFunctionPrinter extends Machine {
    print(doc) {
        //
    }

    fax(doc) {
        //
    }

    scan(doc) {
        //
    }
}

class NotImplementedError extends Error {
    constructor(name) {
        let msg = `${name} is not implemented`
        super(msg);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotImplementedError);
        }
    }
}


class OldFashionedPrinter extends Machine {
    print(doc) {
        // ok
    }

    /**
     * the old-fashioned machine don't know how to fax.
     * We can leave the method empty, do nothing, but this is against the
     * "Principle of the least surprise"
     */
    // fax(doc) {
    // you can comment it!
    // }

    scan(doc) {
        // no scanner!
        throw new NotImplementedError('OldFashionedPrinter.scan');
    }
}

class Printer {
    constructor() {
        if (this.constructor.name === 'Printer') {
            throw new Error('Printer is abstract!');
        }
    }

    print() {

    }
}

class Scanner {
    constructor() {
        if (this.constructor.name === 'Scanner') {
            throw new Error('Scanner is abstract!');
        }
    }

    scan() {

    }
}


class Photocopier extends Printer {

}

let printer = new OldFashionedPrinter();
printer.scan();
