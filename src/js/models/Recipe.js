import axios from "axios";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe () {
try {
    await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
}
catch(error) {
console.log(error)
}
  }
}
