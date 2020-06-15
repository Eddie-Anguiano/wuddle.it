import { elements } from './base';
import triLeft from '../../images/tri-left.svg';
import triRight from '../../images/tri-right.svg';

const limitLetters = (title, limit = 17) => {
  const resultsArr = [];

  if (title.length > limit) {
    title.split(' ').reduce((accu, word) => {
      if (accu + word.length <= limit || resultsArr.length === 0) {
        resultsArr.push(word);
      }
      return accu + word.length;
    }, 0);
    return `${resultsArr.join(' ')}...`;
  }
  return title;
};

const renderRecipe = (recipe) => {
  const markup = `
    <li class="results__item" id="${recipe.idDrink}">
      <img src="${recipe.strDrinkThumb}" alt="${
    recipe.strDrink
  }" class="results__img"/>
      <div class="results__name">${limitLetters(recipe.strDrink)}</div>
    </li>
  `;

  elements.results.insertAdjacentHTML('beforeend', markup);
};

const renderButtons = (currentPage, totalPages) => {
  const markup = `
    <li class="pagination">
      <img
        src="${triLeft}"
        alt="previous results page"
        class="${currentPage === 1 ? 'hidden' : 'pagination__triangle-left'}"
        data-type="previous"
      />
      <div class="pagination__page-numbers">
        <span class="pagination__number">${currentPage}&nbsp;</span>
        <span class="pagination__text">of</span>
        <span class="pagination__number">&nbsp;${totalPages}</span>
      </div>
      <img
        src="${triRight}"
        alt="previous results page"
        class="${
          currentPage === totalPages ? 'hidden' : 'pagination__triangle-right'
        }"
        data-type="next"
      />
    </li>
  `;

  elements.results.insertAdjacentHTML('beforeend', markup);
};

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.results.innerHTML = '';
};

export const renderResults = (results, currentPage = 1) => {
  const resultsPerPage = 10;
  const totalPages = Math.ceil(results.length / resultsPerPage);
  const start = (currentPage - 1) * 10;
  const end = start + resultsPerPage;

  results.slice(start, end).forEach((result) => {
    renderRecipe(result);
  });

  renderButtons(currentPage, totalPages);
};
