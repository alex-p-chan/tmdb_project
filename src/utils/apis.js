const apiVersion = 3;
export const api = `https://api.themoviedb.org/${apiVersion}`;
export const apiKey = '6ed12e064b90ae1290fa326ce9e790ff';
/**
 *
 * Returns Base Image API URL. Accepts width for optimised images
 *
 * @param {integer} width
 */
export const imgApi = (width) => `https://image.tmdb.org/t/p/w${width}`;
