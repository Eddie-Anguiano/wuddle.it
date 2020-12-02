export default class Random {
  async getRandom() {
    const apiKey = process.env.API_KEY;

    try {
      const resultsJSON = await fetch(
        `https://www.thecocktaildb.com/api/json/v2/${apiKey}/randomselection.php`
      );
      this.results = await resultsJSON.json();
    } catch (error) {
      console.log('its me');
    }
  }
}
