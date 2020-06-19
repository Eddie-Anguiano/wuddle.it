import loader from '../../images/load.svg';

export const elements = {
  dropDownList: document.querySelector('.drop-down__list'),
  dropDownBtn: document.querySelector('.drop-down__btn'),
  dropDownBtnText: document.querySelector('.drop-down__btn-text'),
  dropDownBtnIcon: document.querySelector('.drop-down__icon'),
  searchInput: document.querySelector('.search__input'),
  searchBtn: document.querySelector('.search__btn'),
  results: document.querySelector('.results'),
  recipe: document.querySelector('.recipe'),
  ingredient: document.querySelector('.details'),
};

export const renderLoader = (parent) => {
  const markup = `
    <div class="loader">
      <img src="${loader}" alt="loader" class="loader__icon" />
    </div>
  `;

  parent.insertAdjacentHTML('afterbegin', markup);
};

export const clearLoader = () => {
  const loaderElement = document.querySelector('.loader');
  if (loader) {
    loaderElement.parentElement.removeChild(loaderElement);
  }
};
