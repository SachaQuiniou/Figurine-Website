// Toujours commencer par importer les variables d'environnement !
require("dotenv").config();

const express = require("express");
const path = require("path");

// on importe le router
const router = require("./app/router");

const app = express();

// servir les fichiers statiques qui sont dans "integration"
app.set("view engine", "ejs");
const securedPathToAssets = path.join(__dirname, "integration");
const securedPathToViews = path.join(__dirname, "app/views");
app.set("views", securedPathToViews);
app.use(express.static(securedPathToAssets));

// Session
const session = require("express-session");
const inOneDay = 3600 * 24 * 1000;

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      // * true n'est possible que si on a du https : on a besoin d'un certificat SSL
      secure: false,
      expires: inOneDay,
      httpOnly: true,
    },
  })
);

app.use((request, response, next) => {
  if (request.session.bookmarks) {
    app.locals.bookmarks = request.session.bookmarks;
  }

  next();
});

// routage !
app.use(router);

const PORT = process.env.PORT || 3000;
// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${process.env.BASE_URL}: ${PORT}`);
});
