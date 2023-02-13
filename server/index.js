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
const ordersRoutes = require("./routes/orders");
const paintingsRoutes = require("./routes/paintings");
const framesRoutes = require("./routes/frames");
const printSizeRoutes = require("./routes/printSize");
const catalogsRoutes = require("./routes/catalogs");
const subcatalogsRoutes = require("./routes/subcatalogs");
const bannersRoutes = require("./routes/banners");
const setsRoutes = require("./routes/sets");
const firstSec_hpRoutes = require("./routes/firstSec_hp");
const reviewersRoutes = require("./routes/reviewers");
const photoCommentsRoutes = require("./routes/photo-comments");
const verifyRoutes = require("./routes/verify");

const emailToManagerRoutes = require("./routes/email/emailToManager");
const emailToClientRoutes = require("./routes/email/emailToClient");


app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/paintings", paintingsRoutes);
app.use("/api/frames", framesRoutes);
app.use("/api/printSize", printSizeRoutes);
app.use("/api/catalogs", catalogsRoutes);
app.use("/api/subcatalogs", subcatalogsRoutes);
app.use("/api/banners", bannersRoutes);
app.use("/api/sets", setsRoutes);
app.use("/api/firstSec_hp", firstSec_hpRoutes);
app.use("/api/reviewers", reviewersRoutes);
app.use("/api/photoComments", photoCommentsRoutes);
app.use("/api/verify", verifyRoutes);

app.use("/api/emailToManager", emailToManagerRoutes);
app.use("/api/emailToClient", emailToClientRoutes);



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

