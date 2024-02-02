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
  "helvitica": "'Helvitica', sans serif",
  "new times roman": "'New Times Roman', serif",
}
