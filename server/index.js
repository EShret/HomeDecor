require("dotenv").config();

const express = require("express");
const consola = require("consola");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.json());


//            mongoose
//====================================
mongoose.Schema.Types.Boolean.convertToFalse.add("");
mongoose.connect(`mongodb://localhost/${process.env.DATABASE}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("============//connected to dataBase//============"));

//           end mongoose
//====================================

const authRoutes = require("./routes/auth");
const emailRoutes = require("./routes/email");
const paintingsRoutes = require("./routes/paintings");
const catalogsRoutes = require("./routes/catalogs");
const subcatalogsRoutes = require("./routes/subcatalogs");
const bannersRoutes = require("./routes/banners");
const setsRoutes = require("./routes/sets");


app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/paintings", paintingsRoutes);
app.use("/api/catalogs", catalogsRoutes);
app.use("/api/subcatalogs", subcatalogsRoutes);
app.use("/api/banners", bannersRoutes);
app.use("/api/sets", setsRoutes);


//            nuxt.render
//====================================
const { loadNuxt, build } = require("nuxt");
const isDev = process.env.NODE_ENV !== "production";
async function startDev() {
  const nuxt = await loadNuxt(isDev ? "dev" : "start");
  app.use(nuxt.render);
  if (isDev) {
    build(nuxt);
  }
  app.listen(process.env.PORT);
}
//           end nuxt.render
//====================================

startDev();

