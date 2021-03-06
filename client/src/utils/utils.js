/*
 * Remove any special characters or extra spaces
 */
const removeSpecialChars = (input) =>
  input.replace(/\s\s+|[^a-zA-Z0-9 ]/gi, "");

// compare search input to shop items and return words that begin with input
export const getSearchResults = (input, shopItems) => {
  if (!input || !shopItems) return;
  const userInput = removeSpecialChars(input.toLowerCase());

  return shopItems.filter((item) => {
    const itemName = removeSpecialChars(item.name.toLowerCase());
    const wordsThatStartWithQuery = new RegExp(
      "\\b" + userInput + "\\S*",
      "gi"
    );
    return itemName.match(wordsThatStartWithQuery);
  });
};

/*
 * Debounce function
 */
export function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

/*
 * Sort array in ascending order by property
 */
export const sortAsc = (arr, property) =>
  [...arr].sort((a, b) => (a[property] > b[property] ? 1 : -1));

/*
 * Sort array in descending order by property
 */
export const sortDesc = (arr, property) =>
  [...arr].sort((a, b) => (a[property] > b[property] ? -1 : 1));

/*
 * onKeyPress event handler
 */
export const handleKeyPress = (e, callback) => {
  if (e.key !== "Enter") return;
  callback();
};
