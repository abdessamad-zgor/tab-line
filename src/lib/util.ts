export function getAlpha(n: number): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if(n<alphabet.length) return alphabet[n];
  else return alphabet[n%alphabet.length]+getAlpha(Math.floor(n/alphabet.length))
}

export const defaultColumnWidth = window?window.innerWidth*0.1:80;
export const defaultRowHeight = 30;
