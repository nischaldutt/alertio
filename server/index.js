const express = require("express");
const bodyParser = require("body-parser");

const adminRouter = require("./routes/adminRoutes");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ADMIN ROUTES
app.use("/admin", adminRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server online at ${process.env.PORT}`);
});
