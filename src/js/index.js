import '../styles/main.scss';
import { elements } from './views/base';
import * as dropViews from './views/dropViews';
import * as searchViews from './views/searchViews';
import Search from './models/Search';
import Recipe from './models/Recipe';

const state = {
  searchType: 'drink',
};

/*-------------------------------*/
/* DROP-DOWN CONTROLLER */
/*-------------------------------*/

const controlDropDown = () => {
  // State of list is expanded
  if (elements.dropDownList.hasChildNodes()) {
    dropViews.collapseAnimation();

    // wait for animation to end before clearing list
    window.setTimeout(() => {
      dropViews.clearDropList();
    }, 400);

    // State of list is-collapsed
  } else {
    dropViews.renderDropDownItems(state.searchType);
    dropViews.expandAnimation();
  }
};

// updates state.searchType and collapses drop down
const controlSelectSearch = (event) => {
  state.searchType = event.target.closest('.drop-down__item').dataset.type;
  dropViews.collapseAnimation();
  dropViews.updateDropBtnText(state.searchType);
  dropViews.updatePlaceholder(state.searchType);

  // wait for animation to end before clearing list
  window.setTimeout(() => {
    dropViews.clearDropList();
  }, 400);
};

/*-------------------------------*/
/* SEARCH CONTROLLER */
/*-------------------------------*/

const controlSearch = async () => {
  const query = searchViews.getInput();

  searchViews.clearInput();
  searchViews.clearResults();

  if (query) {
    state.search = new Search(query, state.searchType);

    try {
      await state.search.getResults();

      // render results to UI
      searchViews.renderResults(state.search.results.drinks);
      console.log(state.search.results.drinks);
      // set the current results page to 1
      state.pagination = 1;
    } catch (error) {
      console.log(error);
    }
  }
};

/*-------------------------------*/
/* RECIPE CONTROLLER */
/*-------------------------------*/

/*-------------------------------*/
/* EVENT LISTENERS */
/*-------------------------------*/

// Drop-down button
elements.dropDownBtn.addEventListener('click', () => {
  controlDropDown();
});

// Drop-down item
elements.dropDownList.addEventListener('click', (event) => {
  controlSelectSearch(event);
});

// Search button
elements.searchBtn.addEventListener('click', () => {
  controlSearch();
});

// Results List
elements.results.addEventListener('click', (event) => {
  // List item is clicked
  if (event.target.matches('.results__item *')) {
    state.recipe = new Recipe(event.target.closest('.results__item').id);

    // next pagination arrow button is pressed
  } else if (event.target.dataset.type === 'next') {
    state.pagination += 1;
    searchViews.clearResults();
    searchViews.renderResults(state.search.results.drinks, state.pagination);

    // previous pagination arrow button is pressed
  } else if (event.target.dataset.type === 'previous') {
    state.pagination -= 1;
    searchViews.clearResults();
    searchViews.renderResults(state.search.results.drinks, state.pagination);
  }
});
