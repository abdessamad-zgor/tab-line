import { test, expect, describe } from "@jest/globals";
import { lexer } from "../src/lexer";

describe("lexer module", () => {
  test("parse arithematic expression", () => {
    let add = '1000+999';
    let multiply = '1000*999';
    let divide = '1000/999';
    let substract = '1000-999';
    let addTokens = lexer(add);
    let multiplyTokens = lexer(multiply);
    let divideTokens = lexer(divide);
    let substractTokens = lexer(substract);
    console.log("addition: ", addTokens);
    console.log("multilication: ", multiplyTokens);
    console.log("divide", divideTokens);
    console.log("substract", substractTokens);
    expect(addTokens.length).toBe(3);
    expect(multiplyTokens.length).toBe(3);
    expect(divideTokens.length).toBe(3);
    expect(substractTokens.length).toBe(3);
  });
});
