
/**
 * Get everything after last 
 * @param {*} str the string to truncate
 * @param {*} char the string where the truncation should be made
 */
export const subStringAfterChar = (str, char) => {
  // get everything after last char 
  return str.split(char).pop();
}