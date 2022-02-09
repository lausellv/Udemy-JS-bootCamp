// const debounce = (func, delay = 1000)=> {
// let timeoutId;
//   return function (...args) {
// if (timeoutId) clearTimeout(timeoutId)
// timeoutId = setTimeout (()=>{
//   func.apply(null, args)
// }, delay)
  
// }}

function debounce2 (func, delay=1000 ){
  let timeoutId;
  return (...args)=>{
    clearTimeout(timeoutId)
    timeoutId = setTimeout(()=>{
      func(...args)
    }, delay)
  }
}