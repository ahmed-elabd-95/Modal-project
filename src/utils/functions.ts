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