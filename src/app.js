const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const session = require("express-session");

const route = require("./routes");
const { mongodb } = require("./configs/db");

const sortMiddleware = require("./app/middlewares/sort");
const login = require("./app/middlewares/login");
const functions = require("firebase-functions");
const app = express();
const port = 3000;


// Connect to DB
mongodb.connect();
const store = mongodb.createSessionStore(session);
// Session
app.use(
  session({
    store,
    name: "session-blog",
    secret: "loitaitoi",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000 * 60 * 60 },
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static("src/uploads"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// Method override
app.use(methodOverride("_method"));

// HTTP logger
app.use(morgan("dev"));

// Custom middlewares
app.use(sortMiddleware);
app.use(login);

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: require("./utils/handlebars"),
    defaultLayout: "main",
    partialsDir: [
      path.join(__dirname, "resources/views/partials/main"),
      path.join(__dirname, "resources/views/partials/learning"),
      path.join(__dirname, "resources/views/partials/landing"),
      path.join(__dirname, "resources/views/partials/profile"),
      path.join(__dirname, "resources/views/partials/settings"),
      path.join(__dirname, "resources/views/components"),
    ],
  }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));


route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})

exports.app = functions.https.onRequest(app);
