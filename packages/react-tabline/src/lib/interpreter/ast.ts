import {Token, TokenType} from "./lexer"

export interface ASTNode {
  type: TokenType;
  value?: string;
  left?: ASTNode;
  right?: ASTNode;
}

export class Parser {
  private tokens: Token[];
  private currentPosition: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.currentPosition = 0;
  }

  private match(expectedType: TokenType): ASTNode | null {
      const currentToken = this.tokens[this.currentPosition];
      if (currentToken.type === expectedType) {
        this.currentPosition++;
        return { type: currentToken.type, value: currentToken.value };
      }
      return null;
  }

  private factor(): ASTNode | null {
    const number = this.match(TokenType.NUMBER);
    if (number) {
      return { type: TokenType.NUMBER, value: number.value };
    }

    const lparen = this.match(TokenType.LPAREN);
    if (lparen) {
      const expr = this.expression();
      const rparen = this.match(TokenType.RPAREN);
      if (expr && rparen) {
        return expr;
      }
    }

    return null;
  }

  private term(): ASTNode | null {
    let node = this.factor();
    while (this.match(TokenType.MULTIPLY) || this.match(TokenType.DIVIDE)) {
      const operator = this.tokens[this.currentPosition - 1];
      const right = this.factor();
      if (node && right) {
        node = { type: operator.type, left: node, right: right };
      } else {
        return null;
      }
    }
    return node;
  }

  private expression(): ASTNode | null {
    let node = this.term();
    while (this.match(TokenType.PLUS) || this.match(TokenType.MINUS)) {
      const operator = this.tokens[this.currentPosition - 1];
      const right = this.term();
      if (node && right) {
        node = { type: operator.type, left: node, right: right };
      } else {
        return null;
      }
    }
    return node;
  }

  public parse(): ASTNode | null {
    return this.expression();
  }
}

