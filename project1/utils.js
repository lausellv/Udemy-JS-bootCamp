// const func = fetchData(e.target.value);
const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {    // same as return ( arg1, arg2, arg3)
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);  // same as func (arg1,arg2,arg3)
    }, delay);
  };
};