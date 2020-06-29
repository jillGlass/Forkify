// Global app controller
// search - const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
// get - const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
//axios automatically converts to json

import Search from "./models/Search";
import * as SearchView from "./views/SearchView";
import Recipe from "./models/Recipe";
import { elements, renderLoader, clearLoader } from "./views/base";

//state will hold: search object, current recipe object, shopping list object, liked recipes
const state = {};

//Search Controller
const controlSearch = async () => {
  //get query from the view
  //const query = SearchView.getInput();
  const query = "pizza";

  if (query) {
    //new search object and add the search query to state
    state.search = new Search(query);

    //prepare UI for results (spinner)
    SearchView.clearInput();
    SearchView.clearResults();
    renderLoader(elements.searchRes);

    try {
//search for the recipes
    await state.search.getResults();

//render results on UI
    clearLoader();
    SearchView.renderResults(state.search.result);
    }
    catch (error) {
        console.log(error)
        alert('Something went wrong')
        clearLoader();
    }
  }
};
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
// Testing
window.addEventListener("load", (e) => {
    e.preventDefault();
    controlSearch();
  });

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    // if the button is click, go to the dataset within the button(which is the next or prev page)
    const gotToPage = parseInt(btn.dataset.goto, 10);
    SearchView.clearResults();
    SearchView.renderResults(state.search.result, gotToPage);
  }
});

//Recipe Controller

const controlRecipe = async () => {
  // get ID from URL
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    // prepare UI for changes

    // create new recipe object
    state.recipe = new Recipe(id);

    // Testing
    window.r = state.recipe;

    try {
      // get recipe data
      await state.recipe.getRecipe();

      // calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // render recipe
      console.log(state.recipe);
    }
    catch (error) {
        console.log(error);
        alert('Something went wrong with the recipe sorry')
}
};
}

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
