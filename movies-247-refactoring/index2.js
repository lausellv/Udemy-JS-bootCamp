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
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  }
});

createAutocomplete({
  ...autocompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    hideTutorial();

    rightSide = document.querySelector('#right-summary');
    onMovieSelect(movie, rightSide, 'right');
  }
});

const hideTutorial = () => {
  document.querySelector('.tutorial').classList.add('is-hidden');
};

let leftSide;
let rightSide;
const onMovieSelect = async ({ imdbID }, elementSide, side) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'b7f6c5a6',
      i: imdbID
    }
  });
  console.log(response.data);
  // document.querySelector(elementSide).innerHTML = movieTemplate(response.data);  // we no longer need to select the side.
  elementSide.innerHTML = movieTemplate(response.data);
  if (side === 'left') {
    leftSide = response.data;
  } else {
    rightSide = response.data;
  }
  if (leftSide && rightSide) {
    runComparison();
  }
};

const runComparison = () => {
  // document.querySelector('#left-summary').querySelectorAll('.notification');
  const leftSideStats = document.querySelectorAll('#left-summary .notification');
  const rightSideStats = document.querySelectorAll('#right-summary .notification');

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];  // iterates over all articles
console.log(rightStat , leftStat)
    const leftSideValue = parseInt(leftStat.dataset.value); // tsame as  const leftSideValue = leftStat.getAttribute('data-value');
    const rightSideValue = parseInt(rightStat.getAttribute('data-value'));

    if (isNaN(rightSideValue) || isNaN(leftSideValue)) {
      leftStat.classList.remove('is-primary');
      rightStat.classList.remove('is-primary');
    } else if (rightSideValue > leftSideValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    } else {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }
  });
};

const movieTemplate = movieDetail => {
  // let count = 0;
  // const awards2 = movieDetail.Awards.forEach((word => {
  //   const value = parseInt(word);
  //   if (isNaN(value)) {
  //     return;
  //   } else {
  //     count = count + value;
  //   }
  // }))

  const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    let value = parseInt(word);
    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  const metascore = movieDetail.Metascore;
  const boxOffice = movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '');
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = movieDetail.imdbVotes.replace(/,/g, '');
  console.log(
    `meta ${metascore} box ${boxOffice}rating  ${imdbRating} votes ${imdbVotes} Awards ${awards}`
  );
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
  <article data-value=${awards} class="notification is-primary">
  <p class="title">${movieDetail.Awards}</p>
  <p class="subtitle">Awards</p>
  </article>
  <article data-value=${boxOffice} class="notification is-primary">
  <p class="title">${movieDetail.BoxOffice}</p>
  <p class="subtitle">Box Office</p>
  </article>
  <article data-value=${metascore} class="notification is-primary">
  <p class="title">${movieDetail.Metascore}</p>
  <p class="subtitle">Metascore</p>
  </article> 
  <article data-value=${imdbRating} class="notification is-primary">
  <p class="title">${movieDetail.imdbRating}</p>
  <p class="subtitle">IMDB Rating</p>
  </article>
  <article data-value=${imdbVotes} class="notification is-primary">
  <p class="title">${movieDetail.imdbVotes}</p>
  <p class="subtitle">IMDB Votes</p>
  </article>
  `;
};
