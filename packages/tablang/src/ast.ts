import {Token} from "./lexer"

interface Expression {
  accept: <R>(visitor: <T extends any[]>(...args: T)=> R) => R
}

class Literal implements Expression {
  value: any
  type: Token['type']

  constructor(value: any, type: Token['type']){
    this.value = value;
    this.type = type;
  }

  accept <R>(visitor: <T extends any[]>(...args: T)=> R ){
    return visitor(this)
  }
}

class Binary implements Expression {
  left: Expression
  operator: Token
  right: Expression

  constructor( left: Expression, operator: Token, right: Expression ){
    this.left = left
    this.operator = operator 
    this.right = right
  }

  accept <R>(visitor: <T extends any[]>(...args: T)=> R ){
    return visitor(this)
  }
}

class Unary implements Expression {
  operator: Token
  value: Expression

  constructor( operator: Token, value: Expression ){
    this.operator = operator 
    this.value = value
  }

  accept <R>(visitor: <T extends any[]>(...args: T)=> R ){
    return visitor(this)
  }
}

class Group implements Expression {
  value: Expression
  
  constructor(value: Expression ){
    this.value = value
  }

  accept <R>(visitor: <T extends any[]>(...args: T)=> R ){
    return visitor(this)
  }
}

function represent(instance: Expression) {
  if(instance instanceof Binary) {
    return `(${instance.operator.lexeme} ${represent(instance.left)} ${represent(instance.right)})`
  } else if(instance instanceof Unary) {
    return `(${instance.operator.lexeme} ${represent(instance.value)})`
  } else if(instance instanceof Group) {
    return `(${represent(instance.value)})`
  } else if (instance instanceof Literal) {
    return `${instance.value}`
  } else {
    throw Error('Syntax Error: Invalid expression')
  }
}


