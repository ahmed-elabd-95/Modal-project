/**
 * 
 * @param {string} txt - The text to cut.
 * @param {number} [max=50] - The maximum length of the text before truncation. Default is 50.
 * @returns {string} The cut text.
 */

export function txtcutter(txt: string, max : number = 50){
    if (txt.length >= max) return `${txt.slice(0, max)} ...`;
    return txt;
}

/**
 *
* @param {string} x - The numeric string to be formatted.
* @returns {string} A formatted version of the input numeric string with commas as thousand separators.
*
*/
export function numberWithCommas(x: string): string {
 return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
