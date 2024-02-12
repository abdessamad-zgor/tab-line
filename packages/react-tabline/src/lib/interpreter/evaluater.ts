import {ASTNode, Parser} from "./ast";
import {TokenType, Token, Lexer} from "./lexer";

class Interpreter {
  private ast: ASTNode;

  constructor(ast: ASTNode) {
    this.ast = ast;
  }

  private evaluateNode(node: ASTNode): number {
    if (node.type === TokenType.NUMBER) {
      return parseFloat(node.value || "0");
    }

    const leftValue = node.left ? this.evaluateNode(node.left) : 0;
    const rightValue = node.right ? this.evaluateNode(node.right) : 0;

    switch (node.type) {
      case TokenType.PLUS:
        return leftValue + rightValue;
      case TokenType.MINUS:
        return leftValue - rightValue;
      case TokenType.MULTIPLY:
        return leftValue * rightValue;
      case TokenType.DIVIDE:
        if (rightValue === 0) {
          throw new Error("Division by zero");
        }
        return leftValue / rightValue;
      default:
        throw new Error("Invalid node type");
    }
  }

  public evaluate(): number {
    try{
      return this.evaluateNode(this.ast);
    } catch (err) {
      throw err;
    }
  }
}

export function evaluateExpression(input: string) {
  if(input.charAt(0)=="="){
    const lexer = new Lexer(input.slice(1));

    let tokens: Token[];
    try{
      tokens = lexer.tokenize()
    } catch (error) {
      return {data: null, error }
    }
    const parser = new Parser(tokens);
    const ast = parser.parse();

    if (ast) {
      const interpreter = new Interpreter(ast);
      try {
        const result = interpreter.evaluate();
        return {data: result, error: null}
      } catch (error) {
        return {data: null, error }
      }
    } else {
      return { data: null, error: new Error("Invalid expression") }
    }
  }else{
    return {data: input, error: null}
  }
}
