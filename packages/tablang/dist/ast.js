class Literal {
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }
    accept(visitor) {
        return visitor(this);
    }
}
class Binary {
    constructor(left, operator, right) {
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
    accept(visitor) {
        return visitor(this);
    }
}
class Unary {
    constructor(operator, value) {
        this.operator = operator;
        this.value = value;
    }
    accept(visitor) {
        return visitor(this);
    }
}
class Group {
    constructor(value) {
        this.value = value;
    }
    accept(visitor) {
        return visitor(this);
    }
}
function represent(instance) {
    if (instance instanceof Binary) {
        return `(${instance.operator.lexeme} ${represent(instance.left)} ${represent(instance.right)})`;
    }
    else if (instance instanceof Unary) {
        return `(${instance.operator.lexeme} ${represent(instance.value)})`;
    }
    else if (instance instanceof Group) {
        return `(${represent(instance.value)})`;
    }
    else if (instance instanceof Literal) {
        return `${instance.value}`;
    }
    else {
        throw Error('Syntax Error: Invalid expression');
    }
}
export {};
