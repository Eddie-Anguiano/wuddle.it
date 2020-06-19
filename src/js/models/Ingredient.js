export default class Ingredient {
  constructor(ingredient) {
    this.ingredient = ingredient;
  }

  async getDetails() {
    const apiKey = process.env.API_KEY;

    try {
      const resultsJSON = await fetch(
        `https://www.thecocktaildb.com/api/json/v2/${apiKey}/search.php?i=${this.ingredient}`
      );
      this.details = await resultsJSON.json();
    } catch (error) {
      console.log(error);
    }
  }
}
