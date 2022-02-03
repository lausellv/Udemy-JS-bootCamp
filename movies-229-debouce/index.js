const fetchData = async searchTerm => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'd9835cc5',
      s: searchTerm
    }
  });

  console.log(response.data);
  if (!response.data.Response) {
    // if (response.data.Error) // returns a string , therefore, true
    return [];
  }
  return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search for a Movie</b></label>
<input class="input"/>
<div class="dropdown">
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content results"></div>
      
  </div>
</div>


`;
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');  // this will wrap the results

const onInput = async e => {
  const movies = await fetchData(e.target.value);
  for (let movie of movies) {
    // const movies = document.querySelector('.movies');
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${movie.Poster}"/>
<h3><b>${movie.Title}</b></h3>
    `;
    document.querySelector('.movies').appendChild(div);
  }
};

input.addEventListener('input', debounce3(onInput, 500));
