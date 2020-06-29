import axios from "axios";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.image = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert('Something went wrong sorry')
    }
  }

  calcTime() {
      // assuming that we need 15minutes for each three ingredients
      const numIng = this.ingredients.length;
      const periods = Math.ceil(numIng / 3);
      this.time = periods * 15;
  }

  calcServings() {
      this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoon', 'tablespoons', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
    const unitsShort = ['Tbsp', 'Tbsp', 'Oz', 'Oz', 'Tsp', 'Tsp', 'Cup', 'Pound'];

      const newIngredients = this.ingredients.map(el => {
        // uniform ingredients
        let ingredient = el.toLowerCase();
        unitsLong.forEach((unit, i) => {
            ingredient = ingredient.replace(unit, unitsShort[i]);
        })
      
      // remove parenthasis

      // parse ingredients into count, unit and ingredient
      });
      this.ingredients = newIngredients;
  };
  
}
