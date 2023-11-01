// Chat GPT code
export enum TokenType {
  NUMBER,
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
  LPAREN,
  RPAREN,
  END_OF_INPUT
}

export class Token {
  constructor(public type: TokenType, public value: string) {}
}

export class Lexer {
  private input: string;
  private currentPosition: number;

  constructor(input: string) {
    this.input = input;
    this.currentPosition = 0;
  }

  private isDigit(char: string): boolean {
    return /\d/.test(char);
  }

  private advance(): void {
    this.currentPosition++;
  }

  public tokenize(): Token[] {
    const tokens: Token[] = [];
    while (this.currentPosition < this.input.length) {
      const char = this.input[this.currentPosition];
      switch (char) {
        case '+':
          tokens.push(new Token(TokenType.PLUS, char));
          break;
        case '-':
          tokens.push(new Token(TokenType.MINUS, char));
          break;
        case '*':
          tokens.push(new Token(TokenType.MULTIPLY, char));
          break;
        case '/':
          tokens.push(new Token(TokenType.DIVIDE, char));
          break;
        case '(':
          tokens.push(new Token(TokenType.LPAREN, char));
          break;
        case ')':
          tokens.push(new Token(TokenType.RPAREN, char));
          break;
        default:
          if (this.isDigit(char)) {
            let number = char;
            while (this.isDigit(this.input[this.currentPosition + 1])) {
              this.advance();
              number += this.input[this.currentPosition];
            }
            tokens.push(new Token(TokenType.NUMBER, number));
          } else if (char !== ' ') {
            throw new Error(`Invalid character: ${char}`);
          }
          break;
      }
      this.advance();
    }
    tokens.push(new Token(TokenType.END_OF_INPUT, ""));      
    return tokens;
  }
}

