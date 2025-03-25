export function escapeCurlyBraces(text: string) {
  return text.replace(/{/g, '{{').replace(/}/g, '}}');
}
