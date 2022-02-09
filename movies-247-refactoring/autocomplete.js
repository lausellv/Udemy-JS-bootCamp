// the argument is going to be a (config) object
const createAutocomplete = ({root, renderOptions, onOptionSelect, inputValue , fetchData})=>{

  

  root.innerHTML = `
  <label><b>Search Menu</b></label>
  <input type="text" value="" class="input"/>
  <div class="dropdown">
  <div class="dropdown-menu">
  <div class="dropdown.content results"></div></div></div>
  `;
  
  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');
  
  // we will be calling onInput many times.  The very first time timeoutId is undefined ("falsy") and we move on to the function
  const onInput = async e => {
    const items = await fetchData(e.target.value);
    console.log(items);
    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let item of items) {
      const option = document.createElement('a');
      option.classList.add('dropdown-item');
      option.innerHTML = renderOptions(item)  // specific HTML rendering instructions go out (are extracted) / not reusable
      resultsWrapper.appendChild(option);
      
  
      option.addEventListener('click', e => {
        console.log(item);
        dropdown.classList.remove('is-active'); // when clicking on a item the ddown menu dissapears
        input.value = inputValue(item); // no problem bc we are inside an arrow func setting the input value to the title of the mov clicked
        onOptionSelect(item)
        //   async fetchData (movie.imdbID) {
        //   const response = await axios.get('http://www.omdbapi.com/', movie.imdbID)
        // console.log(movieInfo)
      });
    }
  };
  
  // to search items
  input.addEventListener('input', debounce2(onInput, 500)); // we are passing the onInput function as the second argument to addEventListener
  // debounce is sent to utils
  
  // when clicking outside the root menu the dropdown menu dissapears
  document.addEventListener('click', e => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove('is-active');
    }
  });






}