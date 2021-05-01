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

const authRouter = require("./routes/authRouter");
const adminRouter = require("./routes/adminRouter");
const customerRouter = require("./routes/customerRouter");
const branchRouter = require("./routes/branchRouter");

app.use(cors());
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

http.listen(process.env.PORT || 3001, () => {
  console.log(`Server online at ${process.env.PORT}`);
});
