const dotenv = require("dotenv"); // Add this line
dotenv.config();
const bodyParser = require("body-parser");
const express = require("express"); // Add this line
const path = require("path"); // Add this line
const visitanteRouter = require("./routes/VisitanteRoute");
const sequelize = require("./connection");
const Visitante = require("./models/VisitanteModel");
const app = express(); // Add this line

app.set("views", path.join(__dirname, "views")); // Add this line
app.set("view engine", "pug"); // Add this line

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line

app.get("/app/registrar", (_, res) => {
  res.render("registrar");
});

app.get("/app/visitantes", async (_, res) => {
  const visitantes = await Visitante.findAll();
  res.render("visitantes", { visitantes });
});

app.get("/app/visitante/:id", async (req, res) => {
  const visitante = await Visitante.findByPk(req.params.id);
  res.render("visitante", { visitante });
});

app.use("/visitante", visitanteRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

module.exports = { app };
