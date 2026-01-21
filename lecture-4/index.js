const characterModal = document.querySelector('#character-modal');
const characterModalContent = document.querySelector('#character-modal .modal__content');
const charactersList = document.querySelector('#characters-list');

const loadingSentinel = document.querySelector('#loading-sentinel');
const loadingIndicator = document.querySelector('#loading');

const apiBaseUrl = 'https://rickandmortyapi.com/api';

let nextPageNumber = 1;
let hasNextPage = true;

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

const getCharacter = async (id) => {
  return makeGetRequest(`/character/${id}`);
};

const renderMoreCharacters = (characters) => {
  const characterElements = characters.map((character) => {
    const characterElement = document.createElement('div');

    characterElement.dataset.characterId = character.id;
    characterElement.classList.add('characters-list__card', 'card');

    characterElement.innerHTML = `<div class="card__content">
          <div class="card__media">
            <img class="card__image" src="${character.image}" loading="lazy" />
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
        </div>`;

    characterElement.addEventListener('click', handleCharacterClick);

    return characterElement;
  });
  charactersList.append(...characterElements);
};

const renderCharacterModalLoadingIndicator = () => {
  characterModalContent.innerHTML = `<div class="loading ">
      <span class="loading__text">Loading...</span>
    </div>`;
};

const renderCharacterModalContent = (character) => {
  characterModalContent.innerHTML = `
    <div class='card__content'>
      <div class='character-modal__media card__media'>
        <img class='card__image' src='${character.image}' loading='lazy' />
      </div>
      <div class='character__info'>
        <div class='character__heading'>
          <p class='character__name'>${character.name}</p>
          <div class='character__status'>
            <span class='character__status-mark character__status-mark--${character.status.toLowerCase()}'></span>
            <span class='character__text'>${character.status}</span>
          </div>
        </div>
        <div class='character__details'>
          <div class='character__origin'>
            <p class='character__label'>Origin:</p>
            <span class='character__text'>${character.origin.name}</span>
          </div>
          <div class='character__location'>
            <p class='character__label'>Location:</p>
            <span class='character__text'>${character.origin.name}</span>
          </div>
        </div>
      </div>
    </div>`;
};

const renderLoadingError = (page) => {
  const errorElement = document.createElement('div');
  errorElement.classList.add('error');

  errorElement.innerHTML = `<span class="error__text">Something went wrong</span>
      <button data-action="loading-retry" data-page="${page}" class="button error__button">Try again</button>`;

  charactersList.appendChild(errorElement);
};

const updateNextPageInfo = (requestInfo) => {
  if (requestInfo.next) {
    const nextUrl = new URL(requestInfo.next);
    nextPageNumber = nextUrl.searchParams.get('page');
  } else {
    hasNextPage = false;
  }
};

const togglePageScrollbar = (isVisible) => {
  if (isVisible) {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    return;
  }
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
};

const toggleElementVisiblity = (element, isVisible) => {
  if (isVisible) {
    element.classList.remove('hidden');
    return;
  }
  element.classList.add('hidden');
};

const toggleLoadingIndicator = (isVisible) => {
  toggleElementVisiblity(loadingIndicator, isVisible);
};

const toggleCharacterModal = (isVisible) => {
  togglePageScrollbar(!isVisible);
  toggleElementVisiblity(characterModal, isVisible);
};

const handleLoadingRetry = (event) => {
  const errorElement = event.target.closest('.error');
  errorElement.remove();

  startCharactersInfiniteLoading();
};

const handleCharacterModalClose = () => {
  toggleCharacterModal(false);
};

const handleCharacterClick = async (event) => {
  event.stopPropagation();

  renderCharacterModalLoadingIndicator();
  toggleCharacterModal(true);

  const characterCard = event.target.closest('[data-character-id]');
  const id = characterCard.dataset.characterId;
  const data = await getCharacter(id);

  renderCharacterModalContent(data);
};

const actions = {
  'loading-retry': handleLoadingRetry,
  'character-modal-close': handleCharacterModalClose,
};

const loadMoreCharacters = async (page) => {
  toggleLoadingIndicator(true);

  try {
    const { info, results: charactersData } = await getCharacters(page);

    updateNextPageInfo(info);
    renderMoreCharacters(charactersData);
  } catch (error) {
    console.log(error);

    stopCharactersInfiniteLoading();
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

const handleLoadMoreCharactersObserver = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && hasNextPage) {
      loadMoreCharacters(nextPageNumber);
    }
  });
};

const loadMoreCharactersObserver = new IntersectionObserver(handleLoadMoreCharactersObserver, {
  rootMargin: '100px',
});

const startCharactersInfiniteLoading = () => loadMoreCharactersObserver.observe(loadingSentinel);

const stopCharactersInfiniteLoading = () => loadMoreCharactersObserver.unobserve(loadingSentinel);

startCharactersInfiniteLoading();
