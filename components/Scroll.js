export default function Scroll() {
  const searchForm = getQuerySelector('search-form');
  const searchResults = getQuerySelector('search-results');
  const searchInput = getQuerySelector('search-input');
  const filterForm = getQuerySelector('filter-form');
  const moreButton = getQuerySelector('more-button');
  let currentFilter = 'all';
  let counter = 1;
  let datapool = []; //Wahrscheinlich überflüssig
  let filteredCharacters = datapool;

  searchForm.addEventListener('submit', event => event.preventDefault());
  searchInput.addEventListener('input', getSearchResults);
  filterForm.addEventListener('change', () => {
    currentFilter = filterForm.elements['liveStatus'].value;
    renderCharacterCards();
  });

  const allPages = [];

  for (let i = 1; i < 42; i++) {
    allPages.push(`https://rickandmortyapi.com/api/character/?page=${i}`);
  }
  fetchMoreData(allPages);

  moreButton.addEventListener('click', pageKlick);
  //=============GetQuerySelector===================
  function getQuerySelector(datajs) {
    return document.querySelector(`[data-js="${datajs}"]`);
  }

  //==========Fetch Data======================
  async function fetchMoreData(allPages) {
    const response = await fetch(allPages[counter]).catch(error =>
      console.error(error)
    );
    const newData = await response.json();

    datapool.push(...newData.results);
    renderCharacterCards();
    counter++;
  }
  //==================RenderCharacters=================
  function renderCharacterCards() {
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
  //====================Get Search Results====================
  function getSearchResults() {
    const userInput = searchInput.value.trim().toLowerCase();
    filteredCharacters = datapool.filter(character =>
      character.name.toLowerCase().includes(userInput)
    );
    console.log(filteredCharacters);

    renderCharacterCards();
  }

  function pageKlick() {
    if (counter < 43) {
      fetchMoreData(allPages);
    } else {
      alert('no more results!');
    }
  }
}
