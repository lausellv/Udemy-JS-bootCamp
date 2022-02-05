// creation of the configuration object (with several config options that are customized before sending it out to the autocomplete function)
createAutoComplete({
  root: document.querySelector('.autocomplete'),
  renderOption(movie) {
   
    return `
    <img src="${movie.thumbnailUrl}"/>
<h3><b>${movie.title} </b></h3>
    `;
  },
  onOptionSelect: movie => onMovieSelect(movie),

  inputValue(movie) {
    return `${movie.title}
    `;
  },

  async fetchData(searchTerm) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/photos?albumId=1');

    // console.log(response.data.Search);
    // if (!response.data.Response) {
    //   // if (response.data.Error) // returns a string , therefore, true
    //   return [];
    // }
    console.log(response);
    return response.data;
  }
});

const onMovieSelect = async movie => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'd9835cc5',
      i: movie.imdbID
    }
  });
  console.log(response.data);
  document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = movieDetail => {
  return `
  <article class="media">
  <figure class="media-left">
  <p class="image">
  <img src="${movieDetail.Poster}"/>
  </p></figure>
  <div class="media-content">
  <div class="content">
  <h1>${movieDetail.Title}</h1>
    
  <h4>${movieDetail.Genre}</h4>
  <p>
  ${movieDetail.Plot}</p>
  </div>
  </div> 
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.Awards}</p>
  <p class="subtitle">Awards</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.BoxOffice}</p>
  <p class="subtitle">BoxOffice</p>
  </article>  <article class="notification is-primary">
  <p class="title">${movieDetail.Metascore}</p>
  <p class="subtitle">Metascore</p>
  </article>  <article class="notification is-primary">
  <p class="title">${movieDetail.imdbRating}</p>
  <p class="subtitle">imdbRating</p>
  </article>  <article class="notification is-primary">
  <p class="title">${movieDetail.imdbVotes}</p>
  <p class="subtitle">imdbVotes</p>
  </article>
  `;
};
