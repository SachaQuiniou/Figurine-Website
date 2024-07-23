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
    const figurineId = id.match(/article\d+$/);
    // Si c'est un nombre entier => convertit l'id (string de l'url) en nombre
    if (figurineId) {
      req.params.id = Number(id);
      return next();
    }

    const figurine = await dataMapper.getOneFigurine(id);
    console.log(figurine);
    response.render("article", { figurine });
  },
};

module.exports = mainController;
