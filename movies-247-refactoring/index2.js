autocompleteConfig = {
  renderOptions(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `<img src="${imgSrc}"/><b>${movie.Title} (${movie.Year}</b>)`;
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: 'b7f6c5a6',
        s: searchTerm
      }
    });
    if (response.data.Error) return [];
    return response.data.Search;
  }
};

createAutocomplete({
  // these are common to both in this API, that's why we use the spread operator
  ...autocompleteConfig,

  // these are customized
  root: document.querySelector('#left-autocomplete'),

  // how to extract this code that both columns/sides share
  onOptionSelect(movie) {
    //  document.querySelector(".tutorial").classList.add("is-hidden")
    hideTutorial();
    // This is a third leg (see below)
    onMovieSelect(movie, document.querySelector('#left-summary'));
  }
});

createAutocomplete({
  ...autocompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {

    hideTutorial();
    
    rightSide = document.querySelector('#right-summary'); 
    onMovieSelect(movie, rightSide);
  }
});

const hideTutorial = () => {
  document.querySelector('.tutorial').classList.add('is-hidden');
};

const onMovieSelect = async ({ imdbID }, elementSide) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'b7f6c5a6',
      i: imdbID
    }
  });
  console.log(response.data);
  // document.querySelector(elementSide).innerHTML = movieTemplate(response.data);  // we no longer need to select the side.
  elementSide.innerHTML = movieTemplate(response.data);
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
