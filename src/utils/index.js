import Moment from 'moment-jalaali';

const getDayPersian = (date) => {
  if (!date) return 'No Date';
  if (date === 'Invalid Date') {
    return false;
  }
  Moment.loadPersian({ usePersianDigits: false });

  return Moment(date, 'YYYY-MM-D').format('jYYYY/jM/jD');
};
const dataForm = (data) => {
  var formData = new FormData();

  for (var i = 0; i < Object.keys(data).length; i++) {
    if (data[Object.keys(data)[i]] !== '' && data[Object.keys(data)[i]] !== null) {
      formData.append(Object.keys(data)[i], data[Object.keys(data)[i]]);
    }
  }

  return formData;
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name?.split('')[0] ?? name?.split('')[0][0]}${
      name?.split('')[1] ?? name?.split('')[0]
    }`
  };
}
const getToday = () => {
  var date = new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

const getExpireTime = (value) => {
  let numberOfMlSeconds = new Date().getTime();
  let addMlSeconds = 24 * value * 60 * 60 * 1000;
  let newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

  // setexpiredAt(newDateObj.toString());
  return newDateObj.toISOString();
};

const convertToByte = (value) => {
  return value * Math.pow(1024, 3).toFixed(0);
};
const convertByteToInt = (value) => {
  return value / Math.pow(1024, 3);
};

const removeCharacter = (str, character, replace) => str.replace(character, replace);

const uuidGenerator = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
};

const emailGenerator = () => {
  return Math.random().toString(36).slice(2, 8);
};

function largestElement(arr) {
  return arr.reduce((largest, current) => (+current > +largest ? +current : +largest), arr[0]);
}

export {
  uuidGenerator,
  getDayPersian,
  stringAvatar,
  dataForm,
  getExpireTime,
  convertToByte,
  convertByteToInt,
  getToday,
  removeCharacter,
  emailGenerator,
  largestElement
};