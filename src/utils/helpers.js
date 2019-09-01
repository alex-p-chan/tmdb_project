/**
 *
 * Returns good bad or average type acccording to rating
 * @param {integer} rating
 *
 */
const getRatingType = (rating) => {
  if (rating > 8) return 'good';
  if (rating < 4) return 'bad';
  return 'neutral';
};

/**
 *
 * Validates search text
 * @param {string} text
 *
 * */
export const validateText = (text) => (!!text);
/**
 *
 * Formats text for API consumption
 * @param {string} text
 *
 * */
export const formatText = (text) => encodeURI(text.replace(' ', '+'));
/**
 *
 * Formats rating for display on page by cutting decimals and putting it out of 100
 * @param {float} rating
 */
export const formatRating = (rating) => ({
  value: Math.trunc(rating * 10),
  type: getRatingType(rating),
});
/**
 *
 * Formats minutes to hours and minutes
 * @param {integer} time
 *
 */
export const formatTime = (time) => {
  if (!time) return { hours: null, minutes: null };
  const hours = Math.trunc(time / 60);
  const minutes = time - hours * 60;
  const formattedTime = { hours, minutes };
  return formattedTime;
};

/**
 *
 * Formats date for display on page by returning month and year
 * @param {string} date
 *
 */
export const formatDate = (date) => {
  if (!date) return { month: null, year: null };
  const dateObject = new Date(date);
  const year = dateObject.toLocaleString('default', {
    year: 'numeric',
  });
  const month = dateObject.toLocaleString('default', {
    month: 'long',
  });
  const formattedDate = { month, year };
  return formattedDate;
};
