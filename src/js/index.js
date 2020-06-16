// Global app controller
// search - const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
// get - const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
//axios automatically converts to json

import Search from './models/Search'

const search = new Search('pizza');
//console.log(search)
search.getResults()