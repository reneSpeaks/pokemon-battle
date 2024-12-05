export function capitalize(value) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}