export default async function Search() {
  // for(let pageNumber = 1; pageNumber < 43; pageNumber++) {
  // function fetchData()
  // }

  // function fetchData() {
  //   const response = await fetch(
  //     `https://rickandmortyapi.com/api/character?page=${page}`
  //   ).catch(error => console.error(error));
  //   const data = await response.json();
  // }

  const response = await fetch(
    `https://rickandmortyapi.com/api/character/`
  ).catch(error => console.error(error));
  const data = await response.json();

  const charactersData = data.results;
  let filteredCharacters = charactersData;
  const searchForm = getQuerySelector('search-form');
  const searchResults = getQuerySelector('search-results');
  const searchInput = getQuerySelector('search-input');
  const filterForm = getQuerySelector('filter-form');
  let currentFilter = 'all';

  renderCharacters();

  searchForm.addEventListener('submit', event => event.preventDefault());
  searchInput.addEventListener('input', getSearchResults);
  filterForm.addEventListener('change', () => {
    currentFilter = filterForm.elements['liveStatus'].value;
    renderCharacters();
  });

  function getSearchResults() {
    const userInput = searchInput.value.trim().toLowerCase();
    filteredCharacters = charactersData.filter(character =>
      character.name.toLowerCase().includes(userInput)
    );
    renderCharacters();
  }

  function renderCharacters() {
    searchResults.innerHTML = '';
    filteredCharacters
      .filter(
        character =>
          character.status.toLowerCase() === currentFilter.toLowerCase() ||
          currentFilter === 'all'
      )
      .forEach(character => {
        const characterElement = document.createElement('li');
        characterElement.className = 'Search__character';
        characterElement.innerHTML = `
        <h2>${character.name}</h2>
        <img class="Search__character-image" src="${character.image}" alt="${character.name}" width="300" height="300">
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Origin: ${character.origin.name}</p>`;
        searchResults.append(characterElement);
      });
  }

  function getQuerySelector(datajs) {
    return document.querySelector(`[data-js="${datajs}"]`);
  }
}
// https://stackoverflow.com/questions/68366280/filter-by-includes-and-then-sort-by-startswith
