export var TokenType;
(function(TokenType) {
  TokenType[TokenType["LEFT_PAREN"] = 0] = "LEFT_PAREN";
  TokenType[TokenType["RIGHT_PAREN"] = 1] = "RIGHT_PAREN";
  TokenType[TokenType["LEFT_BRACE"] = 2] = "LEFT_BRACE";
  TokenType[TokenType["RIGHT_BRACE"] = 3] = "RIGHT_BRACE";
  TokenType[TokenType["LEFT_CURLY_BRACE"] = 4] = "LEFT_CURLY_BRACE";
  TokenType[TokenType["RIGHT_CURLY_BRACE"] = 5] = "RIGHT_CURLY_BRACE";
  TokenType[TokenType["COMMA"] = 6] = "COMMA";
  TokenType[TokenType["DOT"] = 7] = "DOT";
  TokenType[TokenType["MINUS"] = 8] = "MINUS";
  TokenType[TokenType["PLUS"] = 9] = "PLUS";
  TokenType[TokenType["COLON"] = 10] = "COLON";
  TokenType[TokenType["SLASH"] = 11] = "SLASH";
  TokenType[TokenType["STAR"] = 12] = "STAR";
  TokenType[TokenType["PERCENTAGE"] = 13] = "PERCENTAGE";
  TokenType[TokenType["BANG"] = 14] = "BANG";
  TokenType[TokenType["BANG_EQUAL"] = 15] = "BANG_EQUAL";
  TokenType[TokenType["EQUAL"] = 16] = "EQUAL";
  TokenType[TokenType["EQUAL_EQUAL"] = 17] = "EQUAL_EQUAL";
  TokenType[TokenType["GREATER"] = 18] = "GREATER";
  TokenType[TokenType["GREATER_EQUAL"] = 19] = "GREATER_EQUAL";
  TokenType[TokenType["LESS"] = 20] = "LESS";
  TokenType[TokenType["LESS_EQUAL"] = 21] = "LESS_EQUAL";
  TokenType[TokenType["CONCAT"] = 22] = "CONCAT";
  TokenType[TokenType["IDENTIFIER"] = 23] = "IDENTIFIER";
  TokenType[TokenType["REFERENCE"] = 24] = "REFERENCE";
  TokenType[TokenType["STR"] = 25] = "STR";
  TokenType[TokenType["NUM"] = 26] = "NUM";
  TokenType[TokenType["AND"] = 27] = "AND";
  TokenType[TokenType["ELSE"] = 28] = "ELSE";
  TokenType[TokenType["FALSE"] = 29] = "FALSE";
  TokenType[TokenType["FN"] = 30] = "FN";
  TokenType[TokenType["FOR"] = 31] = "FOR";
  TokenType[TokenType["IF"] = 32] = "IF";
  TokenType[TokenType["NIL"] = 33] = "NIL";
  TokenType[TokenType["OR"] = 34] = "OR";
  TokenType[TokenType["PRINT"] = 35] = "PRINT";
  TokenType[TokenType["TRUE"] = 36] = "TRUE";
  TokenType[TokenType["LET"] = 37] = "LET";
  TokenType[TokenType["WHILE"] = 38] = "WHILE";
  TokenType[TokenType["ALERT"] = 39] = "ALERT";
  TokenType[TokenType["RETURN"] = 40] = "RETURN";
  TokenType[TokenType["EOF"] = 41] = "EOF";
})(TokenType || (TokenType = {}));
const keywords = new Map([
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
]);
export class Token {
  constructor(type, lexeme, line) {
    this.line = line;
    this.type = type;
    this.lexeme = lexeme;
  }
}
export function lexer(input) {
  let start = 0;
  let position = 0;
  let line = 1;
  let tokens = [];
  while (position < input.length) {
    start = position;
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
        line++;
        break;
      case '\t':
        break;
      case ' ':
        break;
      case '\r':
        break;
      case '!':
        let isBangEqual = match(input, position, '=');
        if (isBangEqual)
          position++;
        tokens.push(isBangEqual ?
          new Token(TokenType.BANG_EQUAL, '!=', line) :
          new Token(TokenType.BANG, '!', line));
        break;
      case '>':
        let isGreaterEqual = match(input, position, '=');
        if (isGreaterEqual)
          position++;
        tokens.push(isGreaterEqual ?
          new Token(TokenType.GREATER_EQUAL, '>=', line) :
          new Token(TokenType.GREATER, '>', line));
        break;
      case '<':
        let isLesserEqual = match(input, position, '=');
        let isConcat = match(input, position, '>');
        if (isLesserEqual || isConcat)
          position++;
        tokens.push(isLesserEqual ?
          new Token(TokenType.LESS_EQUAL, '<=', line) : isConcat ?
            new Token(TokenType.CONCAT, '<>', line) : new Token(TokenType.LESS, '<', line));
        break;
      case '=':
        let isEqualEqual = match(input, position, '=');
        if (isEqualEqual)
          position++;
        tokens.push(isEqualEqual ?
          new Token(TokenType.EQUAL_EQUAL, '==', line) :
          new Token(TokenType.EQUAL, '=', line));
        break;
      case '"':
        while (peek(input, position) != '"' && position < input.length) {
          if (peek(input, position) == '\n')
            line++;
          position++;
        }
        if (position >= input.length)
          throw Error('unterminated string');
        position++;
        tokens.push(new Token(TokenType.STR, input.slice(start + 1, position - 1), line));
        break;
      case "'":
        while (peek(input, position) != "'" && position < input.length) {
          if (peek(input, position) == '\n')
            line++;
          position++;
        }
        if (position >= input.length)
          throw Error('unterminated string');
        position++;
        tokens.push(new Token(TokenType.STR, input.slice(start + 1, position - 1), line));
        break;
      default:
        if (isDigit(c)) {
          while (isDigit(peek(input, position)))
            position++;
          if (peek(input, position) == "." && isDigit(peekNext(input, position)))
            position++;
          while (isDigit(peek(input, position)))
            position++;
          tokens.push(new Token(TokenType.NUM, parseNumber(input.slice(start, position + 1)), line));
        }
        else if (isAlpha(c)) {
          while (isAlphaNumeric(peek(input, position)))
            position++;
          let token = input.slice(start, position + 1);
          let type = keywords.get(token);
          tokens.push(new Token(type ? type : TokenType.IDENTIFIER, token, line));
        }
        else {
          throw Error("TabError: Unexpected character " + c + " at line ");
        }
    }
  }
  return tokens;
}
function parseNumber(ch) {
  if (ch.includes('.'))
    return parseFloat(ch);
  return parseInt(ch);
}
function match(input, position, char) {
  if (position >= input.length)
    return false;
  else if (input[position] != char)
    return false;
  return true;
}
function peek(input, position) {
  if (position >= input.length - 1)
    return;
  return input[position];
}
function peekNext(input, position) {
  if (position >= input.length - 1)
    return;
  return input[position + 1];
}
function isDigit(ch) {
  return "0123456789".includes(ch);
}
function isAlpha(c) {
  return (c >= 'a' && c <= 'z') ||
    (c >= 'A' && c <= 'Z') ||
    c == '_';
}
function isAlphaNumeric(c) {
  return isDigit(c) || isAlpha(c);
}
