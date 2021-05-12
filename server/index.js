process.env.NODE_ENV === "production"
  ? require("dotenv").config({ path: __dirname + "/.env" })
  : require("dotenv").config({ path: __dirname + "/.env.test" });

const express = require("express");
const app = express();
const path = require("path");

const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: process.env.REACT_APP_PROXY,
    methods: ["GET", "POST"],
  },
});

const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("./controller/socketioController")(io);

const authRouter = require("./routes/authRouter");
const adminRouter = require("./routes/adminRouter");
const customerRouter = require("./routes/customerRouter");
const branchRouter = require("./routes/branchRouter");

app.use(
  cors({
    origin: [process.env.REACT_APP_PROXY],
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    key: "adminId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 24 * 60 * 60 * 1000, // one day in milliseconds
    },
  })
);

// const time = "2021-05-04T17:14:32.261Z";
// console.log(new Date(Date.parse(time)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authorization routes
app.use("/auth", authRouter);

// Admin routes
app.use("/admin", adminRouter);

// Customer routes
app.use("/customer", customerRouter);

// Branch routes
app.use("/branch", branchRouter);

// Catch all unknown routes ( this middleware runs after all routes have been defined !)
if (process.env.NODE_ENV === "production") {
  // Serve static files
  app.use(express.static(path.resolve(__dirname, "client", "build")));

  app.get("*", (req, res, next) => {
    // Serve index.html file if it doesn't recognize the route
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3001;

http.listen(PORT, () => {
  console.log(`Server online at ${process.env.PORT}`);
});
