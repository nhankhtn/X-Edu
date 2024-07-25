const User = require("../models/User");
const Course = require("../models/Course");
const Section = require("../models/Section");
const Lesson = require("../models/Lesson");
const {
  mongooseToObject,
  mutipleMongooseToObject
} = require("../../utils/mongoose");
const mongoose = require("mongoose")


class SiteController {
  // [GET] /
  async index(req, res, next) {
    try {
      const admins = await User.find({ role: "admin" });
      const courses = [];

      for (let admin of admins) {
        let coursesOfAdmin = await Course.find({ userId: admin?.id });
        coursesOfAdmin = coursesOfAdmin.map(course => {
          return {
            name: course.name,
            price: course.price,
            videoIntro: course.videoIntro,
            slug: course.slug,
            category: course.category,
            updatedAt: course.updatedAt,
            author: {
              username: admin.username,
              avatar: admin.avatar
            }
          }
        })
        courses.push(...coursesOfAdmin);
      }

      res.render("sites/home", {
        courses,
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /landing/:slug
  async landing(req, res, next) {
    try {
      const course = await Course.findOne({
        slug: req.params.slug,
      });
      const sections = await Section.find({
        courseId: course?.id
      });
      const lessons = await Lesson.find({
        courseId: course?.id
      });

      res.render("sites/landing", {
        course: mongooseToObject(course),
        sections: mutipleMongooseToObject(sections),
        lessons: mutipleMongooseToObject(lessons),
        layout: "landing"
      });
    } catch (error) {
      next(error);
    }
  }
  // [GET] /profile/:email
  async profileUser(req, res, next) {
    res.render("sites/profile", {
      user: req.session.user,
      layout: "profile"
    });
  }
}

module.exports = new SiteController();
