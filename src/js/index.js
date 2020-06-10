import '../styles/main.scss';
import { elements } from './views/base';
import * as dropViews from './views/dropViews';

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
