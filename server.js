const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//const cors = require("cors");
const routes = require("./src/express/routes");

/*
var corsOptions = {
  origin: "http://localhost:3000",
};
*/

const app = express();

app.use(express.urlencoded({ extended: true }));
//app.use(cors(corsOptions));
app.use("/api", routes);

//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening to Server at port ${PORT}`);
});

//Database Connection
dotenv.config({ path: "./config/.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

//Intial Connection
(async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      autoIndex: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log("Database Not Connected, please check " + err);
  }
})();

//Database connection check
mongoose.connection.on("connected", (err, res) => {
  console.log("Database Connected Successfully");
});
mongoose.connection.on("error", (err) => {
  console.log("Database Not Connected, please check");
});
