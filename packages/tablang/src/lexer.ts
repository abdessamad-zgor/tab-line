export enum TokenType {
  LEFT_PAREN, RIGHT_PAREN, LEFT_BRACE, RIGHT_BRACE, LEFT_CURLY_BRACE, RIGHT_CURLY_BRACE,

  COMMA, DOT, MINUS, PLUS, COLON, SLASH, STAR, PERCENTAGE,

  BANG, BANG_EQUAL,
  EQUAL, EQUAL_EQUAL,
  GREATER, GREATER_EQUAL,
  LESS, LESS_EQUAL,
  CONCAT,

  IDENTIFIER, REFERENCE, STR, NUM,

  AND, ELSE, FALSE, FN, FOR, IF, NIL, OR,
  PRINT, TRUE, LET, WHILE, ALERT,

  RETURN,

  EOF
}

const keywords = new Map<string, TokenType>([
  ["and", TokenType.AND],
  ["or", TokenType.OR],
  ["if", TokenType.IF],
  ["else", TokenType.ELSE],
  ["print", TokenType.PRINT],
  ["true", TokenType.TRUE],
  ["false", TokenType.FALSE],
  ["while", TokenType.WHILE],
  ["let", TokenType.LET],
  ["alert", TokenType.ALERT],
  ["nil", TokenType.NIL],
  ["for", TokenType.FOR],
  ["fn", TokenType.FN],
  ["return", TokenType.RETURN]
])

export class Token {
  type: TokenType
  lexeme: string | number
  line: number

  constructor(type: TokenType, lexeme: string | number, line: number) {
    this.line = line
    this.type = type
    this.lexeme = lexeme
  }
}

export function lexer(input: string): Token[] {
  let start = 0;
  let position = 0;
  let line = 1;
  let tokens: Token[] = [];

  while (position < input.length) {
    start = position
    let c = input[position++];
    switch (c) {
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
      case '{':
        tokens.push(new Token(TokenType.RIGHT_CURLY_BRACE, '{', line));
        break;
      case '}':
        tokens.push(new Token(TokenType.LEFT_CURLY_BRACE, '}', line));
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
          isBangEqual ?
            new Token(TokenType.BANG_EQUAL, '!=', line) :
            new Token(TokenType.BANG, '!', line))
        break;
      case '>':
        let isGreaterEqual = match(input, position, '=');
        if (isGreaterEqual) position++
        tokens.push(
          isGreaterEqual ?
            new Token(TokenType.GREATER_EQUAL, '>=', line) :
            new Token(TokenType.GREATER, '>', line))
        break;
      case '<':
        let isLesserEqual = match(input, position, '=');
        let isConcat = match(input, position, '>')
        if (isLesserEqual || isConcat) position++
        tokens.push(
          isLesserEqual ?
            new Token(TokenType.LESS_EQUAL, '<=', line) : isConcat ?
              new Token(TokenType.CONCAT, '<>', line) : new Token(TokenType.LESS, '<', line)
        )
        break;
      case '=':
        let isEqualEqual = match(input, position, '=');
        if (isEqualEqual) position++
        tokens.push(isEqualEqual ?
          new Token(TokenType.EQUAL_EQUAL, '==', line) :
          new Token(TokenType.EQUAL, '=', line))
        break;
      case '"':
        while (peek(input, position) != '"' && position < input.length) {
          if (peek(input, position) == '\n') line++;
          position++
        }

        if (position >= input.length) throw Error('unterminated string')
        position++;

        tokens.push(
          new Token(TokenType.STR, input.slice(start + 1, position - 1), line)
        )
        break;
      case "'":
        while (peek(input, position) != "'" && position < input.length) {
          if (peek(input, position) == '\n') line++;
          position++
        }

        if (position >= input.length) throw Error('unterminated string')
        position++;

        tokens.push(
          new Token(TokenType.STR, input.slice(start + 1, position - 1), line)
        )
        break;
      default:
        if (isDigit(c)) {
          while (isDigit(peek(input, position))) position++
          if (peek(input, position) == "." && isDigit(peekNext(input, position))) position++
          while (isDigit(peek(input, position))) position++
          tokens.push(
            new Token(
              TokenType.NUM,
              parseNumber(input.slice(start, position + 1)),
              line)
          )
        } else if (isAlpha(c)) {
          while (isAlphaNumeric(peek(input, position))) position++
          let token = input.slice(start, position + 1)
          let type = keywords.get(token);

          tokens.push(
            new Token(
              type ? type : TokenType.IDENTIFIER,
              token,
              line)
          )
        } else {
          throw Error("TabError: Unexpected character " + c + " at line ")
        }
    }
  }

  return tokens
}

function parseNumber(ch: string): number {
  if (ch.includes('.')) return parseFloat(ch)
  return parseInt(ch)
}

function match(input: string, position: number, char: string): boolean {
  if (position >= input.length) return false;
  else if (input[position] != char) return false;
  return true
}

function peek(input: string, position: number): string | undefined {
  if (position >= input.length - 1) return;
  return input[position]
}

function peekNext(input: string, position: number): string | undefined {
  if (position >= input.length - 1) return;
  return input[position + 1]
}

function isDigit(ch: string): boolean {
  return "0123456789".includes(ch)
}

function isAlpha(c: string): boolean {
  return (c >= 'a' && c <= 'z') ||
    (c >= 'A' && c <= 'Z') ||
    c == '_';
}

function isAlphaNumeric(c: string) {
  return isDigit(c) || isAlpha(c)
}
