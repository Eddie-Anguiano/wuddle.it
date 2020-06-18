export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const resultsJSON = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.id}`
      );
      this.details = await resultsJSON.json();
    } catch (error) {
      console.log(error);
    }
  }
}
