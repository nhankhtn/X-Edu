
const siteRouter = require("./site");
const coursesRouter = require("./courses");
const adminRouter = require("./admin");
const authRouter = require("./auth");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/admin", adminRouter);
  app.use("/courses", coursesRouter);

  app.use("/", siteRouter);
}
module.exports = route;
