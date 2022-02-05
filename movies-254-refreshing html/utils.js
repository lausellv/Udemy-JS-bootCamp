const debounce = (func, delay = 1000) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

// you pass in a function (func) and it returns a function (function is a reserved word in JS)
const debounce2 = (func, delay) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const debounce3 = (func, delay = 1000) => {
  let timeoutId;
  return function (...args) {
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const debounce4 = (func, delay = 1000) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

// let timeoutId;
// const onInput = event => {
//   if (timeoutId) {
//     clearTimeout(timeoutId);
//   }
//   timeoutId = setTimeout(() => {
//     fetchData(event.target.value);
//   }, 500);
// };
