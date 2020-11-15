import moment from "moment";

/**
 * Get everything after last 
 * @param {*} str the string to truncate
 * @param {*} char the string where the truncation should be made
 */
export const subStringAfterChar = (str, char) => {
  // get everything after last char 
  return str.split(char).pop();
}


export const getHumanDuration = (totalTime = 0, timeUnit = "seconds") => {
  const totalSeconds = moment.duration(totalTime, timeUnit).asSeconds().toFixed(0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor((totalSeconds % 3600) % 60);
  return `${hours.toFixed(0)}h ${minutes.toFixed(0)}m ${seconds.toFixed(0)}s`;
}
