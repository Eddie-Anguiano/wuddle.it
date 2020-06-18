/* eslint-disable import/prefer-default-export */
import { elements } from './base';

const parseRecipe = (recipe) => {
  const recipeArray = [];

  for (let i = 1; i < 100; i += 1) {
    const ingredient = `strIngredient${i}`;
    const measure = `strMeasure${i}`;

    if (recipe[ingredient]) {
      let amount = '';
      if (recipe[measure] === null) {
        amount = 'to taste';
      } else {
        amount = recipe[measure];
      }
      recipeArray.push([recipe[ingredient].trim(), amount.trim()]);
    } else {
      break;
    }
  }
  return recipeArray;
};

const renderIngredients = (recipe) => {
  const recipeArray = parseRecipe(recipe);
  let markup = ``;

  // item[0] is the ingredient and item[1] is amount
  recipeArray.forEach((item) => {
    markup += `
      <div class="ingredients__grid-item">
        <span class="ingredients__ingredient">${item[0]}</span>
        <span class="ingredients__amount">${item[1]}</span>
      </div>
    `;
  });
  return markup;
};

export const renderRecipe = (recipe) => {
  const markup = `
  <div class="recipe__card">
    <img src="${recipe.strDrinkThumb}" alt="${
    recipe.strDrink
  }" class="recipe__img" />
    <div class="recipe__details">
      <h2 class="recipe__title">${recipe.strDrink}</h2>
      <div class="recipe__glass">Suggested Glasswear<br />${
        recipe.strGlass
      }</div>
    </div>
  </div>
  <div class="ingredients">
    <h4 class="ingredients__heading">Ingredients</h4>
    <div class="ingredients__info">
      ${renderIngredients(recipe)}
    </div>
    <div class="ingredients__content">
      ${recipe.strInstructions}
    </div>
  </div>
  `;

  elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

export const clearRecipe = () => {
  elements.recipe.innerHTML = '';
};
