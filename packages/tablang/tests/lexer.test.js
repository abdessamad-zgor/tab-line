import { test, expect, describe } from "@jest/globals";
import { lexer } from "../src/lexer";

describe("lexer module", () => {
  test("parse arithematic expressions", () => {
    let expression = '1000+999';
    let tokens = lexer(expression);
    console.log(tokens);
    expect(tokens.length).toBe(3);
  });
});
