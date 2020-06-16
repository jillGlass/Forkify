// Global app controller
// search - const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
// get - const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
//axios automatically converts to json

import axios from "axios";

async function getResults(query) {
    try{const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${query}`)
    const recipes = res.data.recipes
    console.log(recipes)}
    catch(error) {
        alert(error)
    }
    
}

getResults('pizza');
