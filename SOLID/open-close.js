/**
 * OCP states that,
 * Objects are open for extension, closed for modification.
 *      Modification means: add a method to an already tested class
 *      Extension means: inheritance.
 * target is ProductFilter.
 *
 * we should have an abstract class for "Spec", then have "isSatisfied" method mandatory,
 * but JS doesn't support the abs concept.
 */

let Color = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
});

let Size = Object.freeze({
    small: 'small',
    medium: 'medium',
    large: 'large',
})

class Product {
    constructor(name, color, size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}


class ProductFiler {
    filterByColor(products, color) {
        return products.filter(p => p.color === color);
    }

    filterBySize(products, size) {
        return products.filter(p => p.size === size);
    }

    filterBySizeAndColor(products, size, color) {
        return products.filter(p => p.size === size && p.color === color);
    }

    // state space explosion
    // 3 criteria = 7 methods
    // instead of adding many methods to handle logics, add "specification" class with "combinator" (and)
}


let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.green, Size.large);
let house = new Product('House', Color.blue, Size.large);
let products = [apple, tree, house];

let pf = new ProductFiler();
console.log(`Green products (old):`);
for (let p of pf.filterByColor(products, Color.green))
    console.log(`* ${p.name} is green`)


/**
 * Specification Solution ...
 */

class ColorSpecification {
    constructor(color) {
        this.color = color;
    }

    isSatisfied(item) {
        return item.color === this.color;
    }
}

class SizeSpecification {
    constructor(size) {
        this.size = size;
    }

    isSatisfied(item) {
        return item.size === this.size;
    }
}

class BetterFilter {
    filter(items, spec) {
        return items.filter(x => spec.isSatisfied(x));
    }
}

let bf = new BetterFilter();
console.log(`Green products (new):`)
for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
    console.log(`* ${p.name} is green`);
}



/**
 * Combination Solution ...
 *      we can create `and` specification, `or` specification, ...
 */
class AndSpecification {
    constructor(...specs) {
        this.specs = specs;
    }

    isSatisfied(item) {
        return this.specs.every(x => x.isSatisfied(item));
    }
}

console.log(`Large and Green products:`);
let specs = new AndSpecification(
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.large)
);
for (let p of bf.filter(products, specs)) {
    console.log(`* ${p.name} is large and green`);
}
