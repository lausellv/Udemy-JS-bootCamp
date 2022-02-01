// let timeoutId;
// onInput = event => {
//   if (timeoutId) clearTimeout(timeoutId);
//   timeoutId = setTimeout(() => {
//     fetchData(event.target.value);
//   }, 1000);
// };

const debounce = (func, delay = 5000) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args), delay;
    });
  };
};
