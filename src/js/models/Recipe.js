export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    const apiKey = process.env.API_KEY;

    try {
      const resultsJSON = await fetch(
        `https://www.thecocktaildb.com/api/json/v2/${apiKey}/lookup.php?i=${this.id}`
      );
      this.details = await resultsJSON.json();
    } catch (error) {
      console.log(error);
    }
  }
}
