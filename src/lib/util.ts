export function getAlpha(n: number): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if(n<alphabet.length) return alphabet[n];
  else return alphabet[n%alphabet.length]+getAlpha(Math.floor(n/alphabet.length))
}

export function toNumber(c:string): number {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if(c.length==1)
    return alphabet.indexOf(c.toUpperCase());
  else
    return alphabet.indexOf(c[0].toUpperCase())+(26+toNumber(c));
}

export function getColorCodes(){
  let colors = ["#000000"];
  for(let i=1; i<=23; i++){
    colors.push("#"+Math.floor((i/23)*16777215)).toString(16);
  }
  return colors
}

export function toPx(size: number) {
  return size * (1+1/3)
}

export function toPt(size: number) {
  return size * (3/4)
}

export const fontFamilies = {
  "Times New Roman": "Times New Roman, Times, serif",
  "Georgia": "Georgia, serif",
  "Palatino": "Palatino Linotype, Book Antiqua, Palatino, serif",
  "Arial": "Arial, Helvetica, sans-serif",
  "Helvetica": "Helvetica Neue, Helvetica, Arial, sans-serif",
  "Calibri": "Calibri, Candara, Segoe, Optima, sans-serif",
  "Verdana": "Verdana, Geneva, sans-serif",
  "Trebuchet MS": "Trebuchet MS, Helvetica, sans-serif",
  "Arial Narrow": "Arial Narrow, sans-serif",
  "Courier New": "Courier New, Courier, monospace",
  "Lucida Console": "Lucida Console, Monaco, monospace",
  "Consolas": "Consolas, monospace",
  "Monaco": "Monaco, monospace",
  "Impact": "Impact, Charcoal, sans-serif",
  "Comic Sans MS": "Comic Sans MS, cursive, sans-serif",
  "Copperplate": "Copperplate, Papyrus, fantasy",
  "Papyrus": "Papyrus, fantasy",
  "Brush Script MT": "Brush Script MT, cursive",
  "Snell Roundhand": "Snell Roundhand, cursive"
}

export const colors = {
  red: "#FF0000",
  orangeRed: "#FF4500",
  orange: "#FFA500",
  gold: "#FFD700",
  yellow: "#FFFF00",
  yellowGreen: "#9ACD32",
  green: "#008000",
  springGreen: "#00FF7F",
  lightGreen: "#90EE90",
  lime: "#00FF00",
  chartreuse: "#7FFF00",
  cyan: "#00FFFF",
  lightSkyBlue: "#87CEFA",
  skyBlue: "#87CEEB",
  deepSkyBlue: "#00BFFF",
  dodgerBlue: "#1E90FF",
  blue: "#0000FF",
  mediumBlue: "#0000CD",
  darkBlue: "#00008B",
  indigo: "#4B0082",
  darkOrchid: "#9932CC",
  purple: "#800080",
  violet: "#8A2BE2",
  mediumOrchid: "#BA55D3",
  magenta: "#FF00FF",
  hotPink: "#FF69B4",
  deepPink: "#FF1493",
  pink: "#FFC0CB",
  lightPink: "#FFB6C1",
  lavender: "#E6E6FA",
  thistle: "#D8BFD8",
  plum: "#DDA0DD",
  orchid: "#DA70D6",
  mediumPurple: "#9370DB",
  slateBlue: "#6A5ACD",
  steelBlue: "#4682B4"
}
