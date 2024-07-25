const Course = require("../models/Course");
const User = require("../models/User");
const { mutipleMongooseToObject } = require("../../utils/mongoose");
const { cloudinary } = require("../../configs/db")
const { register, login } = require("../../utils/firebase");

class AdminController {
  // [GET] /admin/stored/courses
  async storedCourses(req, res, next) {
    try {
      const courses = await Course.find({
        userId: req.session.user.id,
      }).sortable(req);
      const countDeletedCourses = await Course.countDocumentsDeleted();

      res.render("admin/stored-courses", {
        countDeletedCourses,
        courses: mutipleMongooseToObject(courses),
      });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /admin/trash/courses
  async trashCourses(req, res, next) {
    try {
      const courses = await Course.findDeleted({
        userId: req.session.user._id,
      });

      res.render("admin/trash-courses", {
        courses: mutipleMongooseToObject(courses),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
