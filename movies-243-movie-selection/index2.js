const fetchData = async searchTerm => {
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
<input type="text" value="" class="input"/>
<div class="dropdown">
<div class="dropdown-menu">
<div class="dropdown.content results"></div></div></div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

// we will be calling onInput many times.  The very first time timeoutId is undefined ("falsy") and we move on to the function
const onInput = async e => {
  const movies = await fetchData(e.target.value);
  console.log(movies);
  if (!movies.length) {
    dropdown.classList.remove('is-active');
    return;
  }
  resultsWrapper.innerHTML = '';
  dropdown.classList.add('is-active');
  for (let movie of movies) {
    const option = document.createElement('a');
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    option.classList.add('dropdown-item');
    option.innerHTML = `<img src="${imgSrc}"/>${movie.Title}`;

    option.addEventListener('click', e => {
      console.log(movie);
      dropdown.classList.remove('is-active'); // when clicking on a movie the ddown menu dissapears
      input.value = movie.Title; // no problem bc we are inside an arrow func setting the input value to the title of the mov clicked
      onMovieSelect(movie);
      //   async fetchData (movie.imdbID) {
      //   const response = await axios.get('http://www.omdbapi.com/', movie.imdbID)
      // console.log(movieInfo)
    });
    resultsWrapper.appendChild(option);
  }
};

// to search movies
input.addEventListener('input', debounce(onInput, 500)); // we are passing the onInput function as the second argument to addEventListener
// debounce is sent to utils

// when clicking outside the root menu the dropdown menu dissapears
document.addEventListener('click', e => {
  if (!root.contains(e.target)) {
    dropdown.classList.remove('is-active');
  }
});

const onMovieSelect = async ({ imdbID }) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'b7f6c5a6',
      i: imdbID
    }
  });
  console.log(response.data);
  document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = movieDetail => {
  return `
  <article class="media">
  <figure class="media-left">
  <p class="image"><img src="${movieDetail.Poster}" /></p></figure>
  <div class="media-content">
  <h1>${movieDetail.Title}</h1>
  <h4>${movieDetail.Genre}</h4>
  <p>${movieDetail.Plot}</p>
  </div> 
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.Awards}</p>
  <p class="subtitle">Awards</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.BoxOffice}</p>
  <p class="subtitle">Box Office</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.Metascore}</p>
  <p class="subtitle">Metascore</p>
  </article> 
  <article class="notification is-primary">
  <p class="title">${movieDetail.imdbRating}</p>
  <p class="subtitle">IMDB Rating</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.imdbVotes}</p>
  <p class="subtitle">IMDB Votes</p>
  </article>
  `;

  
};

// let numbers = [1, 2, 3, 4, 5];
// let numbers2 = [];
// let numbers3 = [];
// let sum2 = numbers.forEach(num => {
//   numbers2.push(num);
// });

// console.log(numbers2);

// for (let i = 0; i < numbers.length; i++) {
//   numbers3.push(numbers[i]);
// }

// console.log(numbers3)
