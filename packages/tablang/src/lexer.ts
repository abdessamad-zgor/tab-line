enum TokenType {
  LEFT_PAREN, RIGHT_PAREN, LEFT_BRACE, RIGHT_BRACE,
  COMMA, DOT, MINUS, PLUS, COLON, SLASH, STAR, PERCENTAGE,

  BANG, BANG_EQUAL,
  EQUAL, EQUAL_EQUAL,
  GREATER, GREATER_EQUAL,
  LESS, LESS_EQUAL,
  CONCAT,

  IDENTIFIER, REFERENCE, STR, NUM,

  AND, ELSE, FALSE, FUN, FOR, IF, NIL, OR,
  PRINT, TRUE, LET, WHILE, ALERT,

  EOF
}

class Token {
  type: TokenType
  lexeme: string
  line: number

  constructor(type: TokenType, lexeme: string, line: number){
    this.line = line
    this.type = type
    this.lexeme = lexeme
  }
}

export function lexer( input: string): Token[] {
  let start = 0;
  let position = 0;
  let line = 1;
  let tokens: Token[] = [];

  while(position<input.length){
    start = position
    let c = input[position++];
    switch(c){
      case '(':
        tokens.push(new Token(TokenType.LEFT_PAREN, '(', line));
        break;
      case ')':
        tokens.push(new Token(TokenType.RIGHT_PAREN, ')', line));
        break;
      case '[':
        tokens.push(new Token(TokenType.RIGHT_BRACE, '[', line));
        break;
      case ']':
        tokens.push(new Token(TokenType.LEFT_BRACE, ']', line));
        break;
      case '+':
        tokens.push(new Token(TokenType.PLUS, '+', line));
        break;
      case '-':
        tokens.push(new Token(TokenType.MINUS, '-', line));
        break;
      case '*':
        tokens.push(new Token(TokenType.STAR, '*', line));
        break;
      case '/':
        tokens.push(new Token(TokenType.SLASH, '/', line));
        break;
      case '%':
        tokens.push(new Token(TokenType.PERCENTAGE, '%', line));
        break;
      case ':':
        tokens.push(new Token(TokenType.COLON, ':', line));
        break;
      case '\n':
        line++
        break;
      case '\t':
        break;
      case ' ':
        break;
      case '\r':
        break;
      case '!':
        let isBangEqual = match(input, position, '=');
        if (isBangEqual) position++
        tokens.push(
          isBangEqual?
            new Token(TokenType.BANG_EQUAL, '!=', line):
            new Token(TokenType.BANG, '!', line))
        break;
      case '>':
        let isGreaterEqual = match(input, position, '=');
        if (isGreaterEqual) position++
        tokens.push(
          isGreaterEqual?
            new Token(TokenType.GREATER_EQUAL, '>=', line):
            new Token(TokenType.GREATER, '>', line))
        break;
      case '<':
        let isLesserEqual = match(input, position, '=');
        let isConcat = match(input, position, '>')
        if (isLesserEqual || isConcat) position++
        tokens.push(
          isLesserEqual?
            new Token(TokenType.LESS_EQUAL, '<=', line): isConcat ?
              new Token(TokenType.CONCAT, '<>', line): new Token(TokenType.LESS, '<', line)
        )
        break;
      case '=':
        let isEqualEqual = match(input, position, '=');
        if (isEqualEqual) position++
        tokens.push(isEqualEqual?
          new Token(TokenType.EQUAL_EQUAL, '==', line):
          new Token(TokenType.EQUAL, '=', line))
        break;
      default:
        
    }
  }

  return tokens
}

function match(input:string, position: number,  char: string): boolean {
  if(position>=input.length) return false;
  else if(input[position]!=char) return false;
  return true
}
