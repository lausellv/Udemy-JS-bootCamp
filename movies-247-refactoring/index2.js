autocompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `<img src="${imgSrc}"/><b>${movie.Title} (${movie.Year}</b>)`;
  },
  inputValue(movie){
    return movie.Title
  },
  async fetchData (searchTerm)  {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: 'b7f6c5a6',
        s: searchTerm
      }
    });
    if (response.data.Error) return [];
    return response.data.Search;
 
  }
}

createAutocomplete({
  ...autocompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
     document.querySelector(".tutorial").classList.add("is-hidden")

    onMovieSelect(movie, document.querySelector("#left-summary"));
   
  }
  
});

createAutocomplete({
  ...autocompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden")
    rightSide = document.querySelector("#right-summary")  // this where we select the side

   onMovieSelect(movie, rightSide);

  
}});



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