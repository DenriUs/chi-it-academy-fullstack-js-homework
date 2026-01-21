const charactersList = document.querySelector('#characters-list');
const loadingIndicator = document.querySelector('.loading');

const pageCounter = document.querySelector('.pagination .pagination__page-counter');
const nextPageButton = document.querySelector('.pagination button[data-pagination-type="next"]');
const previousPageButton = document.querySelector(
  '.pagination button[data-pagination-type="prev"]',
);

const apiBaseUrl = 'https://rickandmortyapi.com/api';

let currentPage = 1;

const makeGetRequest = async (path) => {
  const response = await fetch(`${apiBaseUrl}${path}`);
  if (!response.ok) {
    throw new Error('Error during loading');
  }
  return response.json();
};

const getCharacters = async (page) => {
  return makeGetRequest(`/character/?page=${page}`);
};

const renderCharactersList = (characters) => {
  charactersList.innerHTML = characters
    .map(
      (character) => `<div class="card characters-list__card">
        <div class="card__content">
          <div class="card__media">
            <img class="card__image" src="${character.image}" />
          </div>
          <div class="character__info">
            <div class="character__heading">
              <p class="character__name">${character.name}</p>
              <div class="character__status">
                <span class="character__status-mark character__status-mark--${character.status.toLowerCase()}"></span>
                <span class="character__text">${character.status}</span>
              </div>
            </div>
            <div class="character__details">
              <div class="character__origin">
                <p class="character__label">Origin:</p>
                <span class="character__text">${character.origin.name}</span>
              </div>
              <div class="character__location">
                <p class="character__label">Location:</p>
                <span class="character__text">${character.location.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>`,
    )
    .join('');
};

const renderLoadingError = (page) => {
  charactersList.innerHTML = `<div class="error">
      <span class="error__text">Something went wrong</span>
      <button data-action="loading-error-retry" data-page="${page}" class="button error__button">Try again</button>
    </div>`;
};

const updatePageCounter = (requestInfo) => {
  if (requestInfo.next) {
    const nextUrl = new URL(requestInfo.next);
    const nextPageNumber = nextUrl.searchParams.get('page');

    currentPage = nextPageNumber - 1;
  } else {
    currentPage = requestInfo.pages;
  }

  pageCounter.innerHTML = currentPage;
};

const updatePaginationButtons = (requestInfo) => {
  nextPageButton.disabled = !requestInfo.next;
  previousPageButton.disabled = !requestInfo.prev;
};

const toggleLoadingIndicator = (isVisible) => {
  if (isVisible) {
    loadingIndicator.classList.remove('hidden');
  } else {
    loadingIndicator.classList.add('hidden');
  }
};

const disablePaginationButtons = () => {
  nextPageButton.disabled = true;
  previousPageButton.disabled = true;
};

const clearCharactersList = () => {
  charactersList.innerHTML = '';
};

const handleLoadingErrorRetry = (event) => {
  loadCharacterPage(event.target.dataset.page);
};

const handlePagination = (event) => {
  event.target.dataset.paginationType === 'next'
    ? loadCharacterPage(currentPage + 1)
    : loadCharacterPage(currentPage - 1);
};

const actions = {
  'loading-error-retry': handleLoadingErrorRetry,
  pagination: handlePagination,
};

const loadCharacterPage = async (page) => {
  toggleLoadingIndicator(true);

  clearCharactersList();
  disablePaginationButtons();

  try {
    const { info, results: charactersData } = await getCharacters(page);

    updatePageCounter(info);
    updatePaginationButtons(info);
    renderCharactersList(charactersData);
  } catch (error) {
    console.log(error);
    renderLoadingError(page);
  } finally {
    toggleLoadingIndicator(false);
  }
};

const delegateClickEventHandle = (event) => {
  const action = event.target.dataset.action;
  actions[action] && actions[action](event);
};

document.addEventListener('click', delegateClickEventHandle);

loadCharacterPage(currentPage);
