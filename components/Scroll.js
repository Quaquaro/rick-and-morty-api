export default function Scroll() {
  const searchForm = getQuerySelector('search-form');
  const searchResults = getQuerySelector('search-results');
  const searchInput = getQuerySelector('search-input');
  const filterForm = getQuerySelector('filter-form');
  let currentFilter;
  let counter = 0;
  let allCharacters = [];

  searchForm.addEventListener('submit', event => event.preventDefault());
  searchInput.addEventListener('input', getSearchResults);
  filterForm.addEventListener('change', () => {
    currentFilter = filterForm.elements['liveStatus'].value;
    renderCharacterCards(allCharacters);
  });

  const allPages = [];

  for (let i = 1; i <= 42; i++) {
    allPages.push(`https://rickandmortyapi.com/api/character/?page=${i}`);
  }
  let count = 0;

  let timer = setInterval(() => {
    if (count >= 42) {
      clearInterval(timer);
    } else {
      count++;
      fetchMoreData(allPages);
    }
  }, 1000);
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

    allCharacters.push(...newData.results);
    renderCharacterCards(allCharacters);
    counter++;
  }
  //==================RenderCharacters=================
  function renderCharacterCards(allCharacters) {
    searchResults.innerHTML = '';
    allCharacters
      .filter(
        character =>
          character.status === currentFilter ||
          currentFilter === 'All' ||
          currentFilter === undefined
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
    const filteredCharacters = allCharacters.filter(character =>
      character.name.toLowerCase().includes(userInput)
    );

    renderCharacterCards(filteredCharacters);
  }
}
