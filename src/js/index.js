// Global app controller
// search - const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
// get - const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
//axios automatically converts to json

import Search from './models/Search'
import * as SearchView from './views/SearchView'
import { elements } from './views/base'

//state will hold: search object, current recipe object, shopping list object, liked recipes 
const state = {

};

const controlSearch = async () => {
    //get query from the view
    const query = SearchView.getInput();
    console.log(query)
    
    if(query) {
        //new search object and add the search query to state
        state.search = new Search(query);

        //prepare UI for results (spinner)

        //search for the recipes
        await state.search.getResults()

        //render results on UI
        SearchView.renderResults(state.search.result)
    }
    
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();

})


