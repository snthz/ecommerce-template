const express = require("express");
const morgan = require("morgan");
const sequelize = require("./src/database/database");
const passport = require("passport");

// passport
require("./src/config/passport");


/*
 * Initializations
 */
const app = express();
const PORT = process.env.PORT || 4000;

/*
 * Middlewares
 */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());


/*
 * Routes
 */
app.use("/api", require("./src/routes/index.routes"));

/*
 * Sequelize
 */
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

/*
 * Listen the server
 */
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
