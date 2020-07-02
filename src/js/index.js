// Global app controller
// search - const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
// get - const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
//axios automatically converts to json

import Search from "./models/Search";
import * as SearchView from "./views/SearchView";
import * as RecipeViews from "./views/RecipeViews";
import * as ListView from "./views/ListView";
import Recipe from "./models/Recipe";
import List from "./models/List";
import { elements, renderLoader, clearLoader } from "./views/base";

//state will hold: search object, current recipe object, shopping list object, liked recipes
const state = {};

//Search Controller
const controlSearch = async () => {
  //get query from the view
  const query = SearchView.getInput();
  

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
    RecipeViews.clearRecipe();
    renderLoader(elements.recipe);

    // highlight selected search item
    if(state.search) SearchView.highlightSelected(id);

    // create new recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // render recipe
      clearLoader();
      RecipeViews.renderRecipe(state.recipe);

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

//List Controller

const controlList = () => {
    //create a new ingredient if there isn't one there
    if(!state.list) state.list = new List();
    //add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        ListView.renderItem(item);
    })
    
}

// increase or decrease servings
elements.recipe.addEventListener('click', e => {
if(e.target.matches('.btn-decrease, .btn-decrease *')) {
    //decrease button is clicked
    if(state.recipe.servings > 1) {
        state.recipe.updateServings('dec');
        RecipeViews.updateServingsIngredients(state.recipe);
    }
} else if(e.target.matches('.btn-increase, .btn-increase *')) {
    //increase button is clicked
    state.recipe.updateServings('inc');
    RecipeViews.updateServingsIngredients(state.recipe);
} else if(e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
    controlList();
}

});

window.l = new List()