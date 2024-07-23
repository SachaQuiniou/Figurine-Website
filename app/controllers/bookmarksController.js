const dataMapper = require("../database/dataMapper.js");

const bookmarksController = {
  // méthode pour afficher les favoris
  bookmarksPage: (request, response) => {
    response.render("favoris");
  },
};

module.exports = bookmarksController;
