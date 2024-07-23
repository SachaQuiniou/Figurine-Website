const { request, response } = require("express");
const dataMapper = require("../database/dataMapper.js");

const bookmarksController = {
  // méthode pour afficher les favoris
  bookmarksPage: (request, response) => {
    response.render("favoris");
  },

  async addBookmarks(request, response) {
    // * 1. on récupère l'ID
    const id = request.params.id;
    // Vérifier si l'id est nombre entier
    const figurineId = id.match(/\d+$/);

    if (figurineId) {
      // * 2. si les bookmarks n'existent pas, on les créé
      if (!request.session.bookmarks) {
        request.session.bookmarks = [];
      }
      const bookmarks = request.session.bookmarks;

      const foundBookmark = bookmarks.find(
        (bookmark) => bookmark.id === Number(id)
      );

      if (!foundBookmark) {
        try {
          const figurine = await dataMapper.getOneFigurine(id);

          bookmarks.push(figurine);

          request.session.bookmarks = bookmarks;

          // response.locals.bookmarks = request.session.bookmarks;

          return response.redirect("/bookmarks");
        } catch (error) {
          console.error(error);
          return response
            .status(404)
            .send("Erreur lors de l'ajout de la figurine");
        }
      }

      return response.redirect("/bookmarks");
    }

    return response.status(500).send("Erreur lors de l'ajout de la figurine");
  },

  removeBookmarks: (request, response, next) => {
    const id = request.params.id;
    // Vérifier si l'id est nombre entier
    const figurineId = /\d+$/.test(id);
    const bookmarks = request.session.bookmarks;
    console.log(bookmarks);

    if (figurineId) {
      const foundIndexBookmark = bookmarks.filter(
        (bookmark) => bookmark.id !== Number(id)
      );
      console.log(foundIndexBookmark);

      if (foundIndexBookmark) {
        try {
          request.session.bookmarks = foundIndexBookmark;

          return response.redirect("/bookmarks");
        } catch (error) {
          console.error(error);
          return response
            .status(404)
            .send("Erreur lors de l'ajout de la figurine");
        }
      }
      return response.redirect("/bookmarks");
    }
    return response.status(500).send("Erreur lors du retrait de la figurine");
  },
};

module.exports = bookmarksController;
