/**
 * The problem is that you can have functions which work with base class, but which fail
 * completely with the derived class.
 * If you have function which takes a base class like rc, it should be able to take a derived class
 * like sq without breaking the functionality in any way whatsoever.
 */

class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    get width() {
        return this._width
    }

    get height() {
        return this._height;
    }

    set width(value) {
        this._width = value;
    }

    set height(value) {
        this._height = value;
    }

    // a getter
    get area() {
        return this._width * this._height;
    }

    toString() {
        return `${this._width}x${this._height}`;
    }
}

class Square extends Rectangle {
    constructor(size) {
        super(size, size);
    }

    set width(value) {
        this._width = this._height = value;
    }

    set height(value) {
        this._height = this._width = value;
    }
}

let useIt = function (rc) {
    let width = rc._width;
    rc.height = 10; // breaking the functionality here!
    console.log(
        `Expected area of ${10 * width},` +
        `got ${rc.area}`
    );
};

let rc = new Rectangle(2, 3);
// console.log(rc.toString())
useIt(rc);

let sq = new Square(5);
// console.log(sq.toString());
// sq.width = 10;
// console.log(sq.toString());
useIt(sq);
