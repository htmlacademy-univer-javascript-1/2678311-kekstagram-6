// module2-task1
function checkStrLength(inputStr, count) {
  return inputStr.length <= count;
}

checkStrLength('dfggf', 5);

function isPalindrome(input) {
  const inputWithoutSpaces = input.replaceAll(' ', '').toLowerCase();

  const length = inputWithoutSpaces.length;
  for (let i = 0; i < Math.round(length / 2); i++) {
    if (inputWithoutSpaces[i] !== inputWithoutSpaces[length - i - 1]) {
      return false;
    }
  }
  return true;
}

isPalindrome('dmfms');

const notNumericRegexp = RegExp('\\D', 'gm');
function parseNumber(input) {
  const onlyDigits = input.toString().replaceAll(notNumericRegexp, '');

  return parseInt(onlyDigits, 10);
}

parseNumber('kfkgdkf');

//module5-task2

function getMinutes(time) {
  const arrayTime = time.toString().split(':').map(Number);

  return arrayTime[0] * 60 + arrayTime[1];
}

const checkMeetIsPunctual = function (startWork, endWork, startMeeting, lengthMeeting) {
  const [startWorkMinutes, endWorkMinutes, startMeetingMinutes] = [startWork, endWork, startMeeting].map(getMinutes);
  return lengthMeeting + startMeetingMinutes <= endWorkMinutes && startMeetingMinutes >= startWorkMinutes;
};

checkMeetIsPunctual('08:00', '17:30', '14:00', 90); // true
checkMeetIsPunctual('8:0', '10:0', '8:0', 120);     // true
checkMeetIsPunctual('08:00', '14:30', '14:00', 90); // false
checkMeetIsPunctual('14:00', '17:30', '08:0', 90);  // false
checkMeetIsPunctual('8:00', '17:30', '08:00', 900); // false

