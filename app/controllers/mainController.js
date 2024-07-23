const dataMapper = require("../database/dataMapper.js");

const mainController = {
  // méthode pour la page d'accueil
  async homePage(request, response) {
    const figurines = await dataMapper.getAllFigurines();
    response.render("accueil", { figurines });
  },

  // méthode pour la page article
  async articlePage(request, response, next) {
    const id = request.params.id;
    // Vérifier si l'id est nombre entier
    const figurineId = /\d+$/.test(id);

    if (figurineId) {
      const figurine = await dataMapper.getOneFigurine(id);

      return response.render("article", { figurine });
    }

    return response.status(500).send("Une erreur");
  },
};

module.exports = mainController;
