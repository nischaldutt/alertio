require("dotenv").config();

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: process.env.REACT_APP_PROXY,
    methods: ["GET", "POST"],
  },
});

const bodyParser = require("body-parser");
const cors = require("cors");

require("./controller/socketioController")(io);

const adminRouter = require("./routes/adminRouter");
const customerRouter = require("./routes/customerRouter");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ADMIN ROUTES
app.use("/admin", adminRouter);

// CUSTOMER routes
app.use("/customer", customerRouter);

http.listen(process.env.PORT || 3001, () => {
  console.log(`Server online at ${process.env.PORT}`);
});
