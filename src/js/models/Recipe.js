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
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

      const newIngredients = this.ingredients.map(el => {
        // uniform ingredients
        let ingredient = el.toLowerCase();
        unitsLong.forEach((unit, i) => {
            ingredient = ingredient.replace(unit, unitsShort[i]);
        })
      
      // remove parenthasis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // parse ingredients into count, unit and ingredient
    const arrIng = ingredient.split(' ');
     // find the index position of the unit within unitsShort
    const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2))

        let objIng;
    if(unitIndex > -1) {
        //there is a unit

    } else if (parseInt(arrIng[0], 10)) {
        // if there is no unit but the first unit is a number
        objIng = {
            count: parseInt(arrIng[0], 10),
            unit: '',
            ingredient: arrIng.slice(1).join(' ')
        }

    } else if (unitIndex === -1) {
        //there is no unit and no number in first position
        objIng = {
            count: 1,
            unit: '',
            ingredient
        }
    }

      return objIng;
      });
      this.ingredients = newIngredients;
  };
  //comment
}
