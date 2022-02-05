const createAutoComplete = ({ root, onOptionSelect, renderOption, fetchData , inputValue}) => {
  root.innerHTML = `
<label><b>Search Menu</b></label>
<input class="input"/>
<div class="dropdown">
  <div class="dropdown-menu" >
    <div class="dropdown-content results"></div>
  </div>
</div>
`;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results'); // this will wrap the results

  const onInput = async e => {
    const items = await fetchData(e.target.value);

    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let item of items) {
      const option = document.createElement('a');
      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(item);

      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        console.log(item.Title);
        input.value = inputValue(item)
        onOptionSelect(item);
        // do another request
        // get data
        // render data
      });
      resultsWrapper.appendChild(option);
    }
  };

  input.addEventListener('input', debounce(onInput, 500));

  document.addEventListener('click', e => {
    // checking to see if any element outiside of root has been clicked
    if (!root.contains(e.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
