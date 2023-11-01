const OPTION_DEFAULT = "- choose -";

const DEFAULT_PAINTS = new Set([
  OPTION_DEFAULT,
  "Behr",
  "Benjamin Moore",
  "Dunn-Edwards",
  "Farrow & Ball",
  "Glidden",
  "Miller",
  "Parker",
  "Rodda",
  "Sherwin-Williams",
  "other",
]);

const DEFAULT_QUANTITIES = new Set([
  "- choose -",
  "about a quart",
  "less than a gallon",
  "less than two gallons",
  "less than five gallons",
  "other",
]);

const DEFAULT_SHEENS = new Set([
  "- choose -",
  "flat",
  "eggshell",
  "velvet",
  "semi-gloss",
  "high-gloss",
]);

const DEFAULT_UPLOAD_PHOTO = { preview: "", data: null };

export {
  DEFAULT_PAINTS,
  DEFAULT_SHEENS,
  DEFAULT_QUANTITIES,
  DEFAULT_UPLOAD_PHOTO,
  OPTION_DEFAULT,
};
