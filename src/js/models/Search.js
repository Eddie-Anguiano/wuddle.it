export default class Search {
  constructor(query, searchType) {
    this.query = query;
    this.searchType = searchType;
  }

  async getResults() {
    let apiURL = '';

    switch (this.searchType) {
      case 'drink':
        apiURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.query}`;
        break;
      case 'letter':
        apiURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${this.query}`;
        break;
      case 'ingredient':
        apiURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.query}`;
        break;
      default:
    }

    try {
      const resultsJSON = await fetch(apiURL);
      this.results = await resultsJSON.json();
    } catch (error) {
      console.log(error);
    }
  }
}
