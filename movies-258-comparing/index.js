const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
    <img src="${imgSrc}"/>
<h3><b>${movie.Title} (${movie.Year})</b></h3>
    `;
  },
  inputValue(movie) {
    return `${movie.Title}
    `;
  },

  async fetchData(searchTerm) {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: 'd9835cc5',
        s: searchTerm
      }
    });

    // console.log(response.data.Search);
    if (!response.data.Response) {
      // if (response.data.Error) // returns a string , therefore, true
      return [];
    }
    return response.data.Search;
  }
};

// creation of the configuration object (with several config options that are customized before sending it out to the autocomplete function)
createAutoComplete({
  root: document.querySelector('#left-autocomplete'),
  ...autoCompleteConfig,
  onOptionSelect: movie => {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  }
});
createAutoComplete({
  root: document.querySelector('#right-autocomplete'),
  ...autoCompleteConfig,
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  }
});
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'd9835cc5',
      i: movie.imdbID
    }
  });
  console.log(response.data);
  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  // document.querySelector('#left-summary').querySelectorAll('.notification');
  const leftSideStats = document.querySelectorAll('#left-summary .notification');
  const rightSideStats = document.querySelectorAll('#right-summary .notification');

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];

    const leftSideValue = parseInt(leftStat.dataset.value);   // same as  const leftSideValue = leftStat.getAttribute('data-value');
    const rightSideValue = parseInt(rightStat.getAttribute('data-value'));

    if (isNaN(rightSideValue)||isNaN(leftSideValue)){
      leftStat.classList.remove('is-primary');
      rightStat.classList.remove('is-primary');

    }
    
    else if (rightSideValue > leftSideValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    } else {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }
  });
};

const movieTemplate = movieDetail => {
  const dollars = movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '');
  const metascore = movieDetail.Metascore;
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = movieDetail.imdbVotes.replace(/,/g, '');

  const awards = movieDetail.Awards.split(' ').reduce((accum, item) => {
    value = parseInt(item); // if it's a string it will return NaN
    if (isNaN(value)) {
      return accum;
    } // isNaN is Boolean
    else {
      return accum + value;
    }
  }, 0);

  console.log(awards);

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
  <article data-value=${awards} class="notification is-primary">
  <p class="title">${movieDetail.Awards}</p>
  <p class="subtitle">Awards</p>
  </article>
  <article data-value=${dollars} class="notification is-primary">
  <p class="title">${movieDetail.BoxOffice}</p>
  <p class="subtitle">BoxOffice</p>
  </article>  
  <article data-value=${metascore} class="notification is-primary">
  <p class="title">${movieDetail.Metascore}</p>
  <p class="subtitle">Metascore</p>
  </article>  
  <article data-value=${imdbRating} class="notification is-primary">
  <p class="title">${movieDetail.imdbRating}</p>
  <p class="subtitle">imdbRating</p>
  </article>  
  <article data-value=${imdbVotes} class="notification is-primary">
  <p class="title">${movieDetail.imdbVotes}</p>
  <p class="subtitle">imdbVotes</p>
  </article>
  `;
};
