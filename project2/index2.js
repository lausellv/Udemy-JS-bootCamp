const fetchAllData = async searchTerm => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'b7f6c5a6',

      s: searchTerm
    }
  });
  if (response.data.Error) return [];
  return response.data.Search;

  // .then(function (response) {
  //   console.log(response.data.Search);
  //   if (response.data.Error) return [];
  //   return response.data.Search;
  // });
};

const root = document.querySelector('.autocomplete');

root.innerHTML = `
<label><b>Search for a Movie</b></label>
<input type="text" class="input"/>
<div class="dropdown">
<div class="dropdown-menu">
<div class="dropdown.content results"></div></div></div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

// we will be calling onInput many times.  The very first time timeoutId is undefined ("falsy") and we move on to the function
const onInput = async e => {
  const movies = await fetchAllData(e.target.value);
  if (!movies.length) {
    dropdown.classList.remove('is-active');
    return;
  }
  resultsWrapper.innerHTML = '';
  dropdown.classList.add('is-active');
  for (let movie of movies) {
    console.log(movie.imdbID)
    const option = document.createElement('a');
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    option.classList.add('dropdown-item');
    option.innerHTML = `<img src="${imgSrc}"/>${movie.Title}`;

    option.addEventListener('click', e => {
      dropdown.classList.remove('is-active');
      input.value = movie.Title;
      
    });
    resultsWrapper.appendChild(option);
  }
};

document.addEventListener('click', e => {
  if (!root.contains(e.target)) {
    dropdown.classList.remove('is-active');
  }
});
// to search movies
input.addEventListener('input', debounce(onInput, 500)); // we are passing the onInput function as the second argument to addEventListener

// debounce is sent to utils

// const debounce = (func, delay = 1000) => {
//   let timeoutId;
//   return (...args) => {
//     if (timeoutId) clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       func.apply(null, args);
//     }, delay);
//   };
// };

// to search movie by id
const idInput = document.querySelector('#movieId');
// const fetchData = async searchMovieId => {
//   // e.target.value === searchTerm
//   const response = await axios
//     .get('http://www.omdbapi.com/', {
//       params: {
//         apikey: 'b7f6c5a6',
//         i: searchMovieId //e.target.value === searchMovieTitle
//       }
//     })
//     .then(function (response) {
//       console.log(response.data);
//       return response;
//     });
// };
// let timeoutId;
// onIdInput = e => {
//   // if (timeoutId) {
//   //   clearTimeout(timeoutId);
//   // }
//   // timeoutId = setTimeout(() => {
//     console.log(e)
//   fetchData(e.target.value);
//   //   }, 1000); // e.target.value === searchMovieId
// };

// idInput.addEventListener('input', debounce(onIdInput));

// let timeoutId;
// const onInput = e => {
//   if (timeoutId) {
//     clearTimeout(timeoutId);
//   }
//   timeoutId = setTimeout(() => {
//     fetchAllData(e.target.value);
//   }, 1000);
// };

// const onIdInput = e => {
//   if (timeoutId) {
//     clearTimeout(timeoutId);
//   }
//   timeoutId = setTimeout(() => {
//     fetchData(e.target.value);
//   }, 1000);
// };

// input.addEventListener('input', onInput);
// idInput.addEventListener('input', onIdInput);
