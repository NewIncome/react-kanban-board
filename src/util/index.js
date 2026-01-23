function convertName(str) {
  return str.toLowerCase()
            .split("_")
            .map(word => word[0].toUpperCase() + word.slice(1))
            .join(" ");
}

export { convertName };
