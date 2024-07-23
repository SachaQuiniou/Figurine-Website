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

// routage !
app.use(router);

const PORT = process.env.PORT || 3000;
// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${process.env.BASE_URL}: ${PORT}`);
});
