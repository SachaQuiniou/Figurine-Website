const dataMapper = require("../database/dataMapper.js");

const mainController = {
  // méthode pour la page d'accueil
  async homePage(request, response) {
    const figurines = await dataMapper.getAllFigurines();
    const count = await dataMapper.CounterCategory();
    response.render("accueil", { figurines, count });
  },

  // méthode pour la page article
  async articlePage(request, response, next) {
    const id = request.params.id;
    // Vérifier si l'id est nombre entier
    const figurineId = /\d+$/.test(id);

    if (figurineId) {
      const figurine = await dataMapper.getOneFigurine(id);
      const reviews = await dataMapper.getOneReview(id);
      const count = await dataMapper.CounterCategory();
      return response.render("article", { figurine, reviews, count });
    }

    return response.status(500).send("Une erreur");
  },

  async categoryPage(request, response) {
    const nameCategory = request.params.nameCategory;
    const count = await dataMapper.CounterCategory();
    const category = await dataMapper.getCategoryOfFigurine(nameCategory);
    console.log("REQUETE", category);
    return response.render("category", { category, count });
  },
};

module.exports = mainController;
