function checkStrLength(inputStr, count) {
  return inputStr.length <= count;
}

function isPalindrome(input) {
  const inputWithoutSpaces = input.replaceAll(" ", "").toLowerCase();

  const length = inputWithoutSpaces.length;
  for (let i = 0; i < Math.round(length / 2); i++) {
    if (inputWithoutSpaces[i] !== inputWithoutSpaces[length - i - 1]) {
      return false;
    }
  }
  return true;
}

const notNumericRegexp = RegExp("\\D", "gm");
function parseNumber(input) {
  const onlyDigits = input.toString().replaceAll(notNumericRegexp, "");

  return parseInt(onlyDigits, 10);
}
