export function aOrAnd(input: string) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  if (input[0] && vowels.has(input[0].toLocaleLowerCase())) {
    return "an";
  }

  return "a";
}
