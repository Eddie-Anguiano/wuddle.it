import { elements } from './base';
// import { render } from 'node-sass';

const types = ['drink', 'letter', 'ingredient'];

const renderItems = (type) => {
  const markup = `
    <li class="drop-down__item" data-type="${type}">
      <span class="drop-down__label">by ${type}</span>
    </li>
  `;
  elements.dropDownList.insertAdjacentHTML('afterbegin', markup);
};

export const renderDropDownItems = (currentType) => {
  types.forEach((type) => {
    if (type !== currentType) {
      renderItems(type);
    }
  });
};

export const clearDropList = () => {
  elements.dropDownList.innerHTML = '';
};

export const updateDropBtnText = (type) => {
  elements.dropDownBtnText.textContent = `by ${type}`;
};

export const expandAnimation = () => {
  elements.dropDownList.classList.remove('collapse');
  elements.dropDownList.classList.add('expand');
  elements.dropDownBtnIcon.classList.remove('rotateDown');
  elements.dropDownBtnIcon.classList.add('rotateUp');

  document.querySelectorAll('.drop-down__label').forEach((item, index) => {
    const label = item;
    label.style.animation = `${0.3 + index * 0.2}s ease-in-out fadeUpIn`;
  });
};

export const collapseAnimation = () => {
  elements.dropDownList.classList.remove('expand');
  elements.dropDownList.classList.add('collapse');
  elements.dropDownBtnIcon.classList.remove('rotateUp');
  elements.dropDownBtnIcon.classList.add('rotateDown');

  document.querySelectorAll('.drop-down__label').forEach((item, index) => {
    const label = item;
    label.style.animation = `${0.3 + index * 0.2}s ease-in-out fadeDownOut`;
  });
};

export const updatePlaceholder = (currentSearchType) => {
  switch (currentSearchType) {
    case 'drink':
      elements.searchInput.placeholder = 'e.g. "Old Fashion"';
      break;
    case 'letter':
      elements.searchInput.placeholder = 'e.g. "A"';
      break;
    case 'ingredient':
      elements.searchInput.placeholder = 'e.g. "Vodka"';
      break;
    default:
  }
};
