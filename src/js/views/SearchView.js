import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
}

export const limitRecipeTitle = (title, limit = 17) => {
    // if title is over 17letters then wrap text. Split into words, use reduce to count the letters in each word (title word = cur). if accumulated letters + current title (cur) length are less than 17 add to newTitle array.
    if(title.length > limit) {
        let newTitle = [];
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur)
            } return acc + cur.length;
        }, 0)
        //return result
        return `${newTitle.join(' ')}...`

    } return title
}

export const renderRecipe = (recipe) => {
  const markUp = `<li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;
  elements.searchResList.insertAdjacentHTML("beforeend", markUp);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage
  recipes.slice(start, end).forEach(renderRecipe);
};
