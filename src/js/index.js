import '../styles/main.scss';
import { elements, renderLoader, clearLoader } from './views/base';
import * as dropViews from './views/dropViews';
import * as searchViews from './views/searchViews';
import * as recipeViews from './views/recipeViews';
import * as ingredientViews from './views/ingredientViews';
import Search from './models/Search';
import Recipe from './models/Recipe';
import Ingredient from './models/Ingredient';

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
  renderLoader(elements.results);

  if (query) {
    state.search = new Search(query, state.searchType);

    try {
      await state.search.getResults();

      // render results to UI
      clearLoader();
      searchViews.renderResults(state.search.results.drinks);
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

const controlRecipe = async (itemId) => {
  state.recipes = new Recipe(itemId);
  recipeViews.clearRecipe();
  renderLoader(elements.recipe);

  try {
    await state.recipes.getRecipe();
    const recipe = state.recipes.details.drinks[0];

    clearLoader();
    recipeViews.renderRecipe(recipe);
  } catch (error) {
    console.log(error);
  }
};

/*-------------------------------*/
/* INGREDIENT CONTROLLER */
/*-------------------------------*/

const controlDetails = async (event) => {
  const textContent = ingredientViews.getText(event);
  ingredientViews.clearIngredient();
  renderLoader(elements.ingredient);

  try {
    state.ingredient = new Ingredient(textContent);
    await state.ingredient.getDetails();

    clearLoader();
    ingredientViews.renderIngredient(state.ingredient.details.ingredients[0]);
    console.log(state.ingredient.details.ingredients[0]);
  } catch (error) {
    console.log(error);
  }
};

/*-------------------------------*/
/* EVENT LISTENERS */
/*-------------------------------*/

// Click on drop-down button
elements.dropDownBtn.addEventListener('click', () => {
  controlDropDown();
});

// Click on drop-down item
elements.dropDownList.addEventListener('click', (event) => {
  controlSelectSearch(event);
});

// click on search button
elements.searchBtn.addEventListener('click', () => {
  controlSearch();
});

// click on results List
elements.results.addEventListener('click', (event) => {
  // List item is clicked
  if (event.target.matches('.results__item *')) {
    const itemId = event.target.closest('.results__item').id;
    controlRecipe(itemId);

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

// Click on Ingredient
elements.recipe.addEventListener('click', (event) => {
  if (event.target.matches('.ingredients__ingredient')) {
    controlDetails(event);
  }
});
