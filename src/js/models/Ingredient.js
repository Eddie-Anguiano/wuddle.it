export default class Ingredient {
  constructor(ingredient) {
    this.ingredient = ingredient;
  }

  async getDetails() {
    try {
      const resultsJSON = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${this.ingredient}`
      );
      this.details = await resultsJSON.json();
    } catch (error) {
      console.log(error);
    }
  }
}
