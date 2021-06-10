// B"H

function getRandomAsciiAlphabetInt() {
  // lower case ascii chars range (a-z)
  let min = 97;
  let max = 122;

  /* From mozila site not sure why it's necessary probably if you use floats numbers.
  / min = Math.ceil(min);
  / max = Math.floor(max);
  */
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


/**
 * @returns random string 
 * @param {the length of the random string to generate} length 
 */
function getRandomString(length) {
  let randomString = [];
  // generate random number of alphabetic ascii value and add it to array.
  for(i = 0; i < length; i++){
    let randomCharAsciiValue = getRandomAsciiAlphabetInt();
    randomString.push(randomCharAsciiValue);
  }
  // Slice array into pieces and convert to chars.
  return String.fromCharCode(...randomString);
}


exports.getRandomString = getRandomString;
