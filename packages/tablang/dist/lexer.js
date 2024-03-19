export var TokenType;
(function (TokenType) {
    TokenType[TokenType["LEFT_PAREN"] = 0] = "LEFT_PAREN";
    TokenType[TokenType["RIGHT_PAREN"] = 1] = "RIGHT_PAREN";
    TokenType[TokenType["LEFT_BRACE"] = 2] = "LEFT_BRACE";
    TokenType[TokenType["RIGHT_BRACE"] = 3] = "RIGHT_BRACE";
    TokenType[TokenType["COMMA"] = 4] = "COMMA";
    TokenType[TokenType["DOT"] = 5] = "DOT";
    TokenType[TokenType["MINUS"] = 6] = "MINUS";
    TokenType[TokenType["PLUS"] = 7] = "PLUS";
    TokenType[TokenType["COLON"] = 8] = "COLON";
    TokenType[TokenType["SLASH"] = 9] = "SLASH";
    TokenType[TokenType["STAR"] = 10] = "STAR";
    TokenType[TokenType["PERCENTAGE"] = 11] = "PERCENTAGE";
    TokenType[TokenType["BANG"] = 12] = "BANG";
    TokenType[TokenType["BANG_EQUAL"] = 13] = "BANG_EQUAL";
    TokenType[TokenType["EQUAL"] = 14] = "EQUAL";
    TokenType[TokenType["EQUAL_EQUAL"] = 15] = "EQUAL_EQUAL";
    TokenType[TokenType["GREATER"] = 16] = "GREATER";
    TokenType[TokenType["GREATER_EQUAL"] = 17] = "GREATER_EQUAL";
    TokenType[TokenType["LESS"] = 18] = "LESS";
    TokenType[TokenType["LESS_EQUAL"] = 19] = "LESS_EQUAL";
    TokenType[TokenType["CONCAT"] = 20] = "CONCAT";
    TokenType[TokenType["IDENTIFIER"] = 21] = "IDENTIFIER";
    TokenType[TokenType["REFERENCE"] = 22] = "REFERENCE";
    TokenType[TokenType["STR"] = 23] = "STR";
    TokenType[TokenType["NUM"] = 24] = "NUM";
    TokenType[TokenType["AND"] = 25] = "AND";
    TokenType[TokenType["ELSE"] = 26] = "ELSE";
    TokenType[TokenType["FALSE"] = 27] = "FALSE";
    TokenType[TokenType["FN"] = 28] = "FN";
    TokenType[TokenType["FOR"] = 29] = "FOR";
    TokenType[TokenType["IF"] = 30] = "IF";
    TokenType[TokenType["NIL"] = 31] = "NIL";
    TokenType[TokenType["OR"] = 32] = "OR";
    TokenType[TokenType["PRINT"] = 33] = "PRINT";
    TokenType[TokenType["TRUE"] = 34] = "TRUE";
    TokenType[TokenType["LET"] = 35] = "LET";
    TokenType[TokenType["WHILE"] = 36] = "WHILE";
    TokenType[TokenType["ALERT"] = 37] = "ALERT";
    TokenType[TokenType["EOF"] = 38] = "EOF";
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
    ["fn", TokenType.FN]
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
