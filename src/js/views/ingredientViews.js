import { elements } from './base';

export const getText = (event) => {
  return event.target.textContent;
};

export const clearIngredient = () => {
  elements.ingredient.innerHTML = '';
};

export const renderIngredient = (ingredient) => {
  const markup = `
    <h3 class="details__heading">Ingredient Details</h3>
      <div class="details__info-container">
        <span class="details__name">${ingredient.strIngredient}</span>
        <span class="details__abv">${
          ingredient.strABV ? `ABV ${ingredient.strABV}` : ''
        }</span>
      </div>
      <div class="details__content">
        ${
          ingredient.strDescription
            ? ingredient.strDescription
            : 'Description not available'
        }
      </div>
  `;

  elements.ingredient.insertAdjacentHTML('afterbegin', markup);
};
