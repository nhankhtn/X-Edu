const Course = require("../models/Course");
const Section = require("../models/Section");
const Lesson = require("../models/Lesson");
const Progress = require("../models/Progress");
const { mongooseToObject, mutipleMongooseToObject } = require("../../utils/mongoose");
const cloudinary = require("../../configs/db/cloudinary");


class CourseController {
  // [GET] /courses/:slug
  async showCourse(req, res, next) {
    try {
      const course = await Course.findOne({
        slug: req.params.slug
      });
      const sections = await Section.find({
        course: req.params.slug
      });
      const lessons = await Lesson.find({
        course: req.params.slug
      });
      const progress = await Progress.findOne({
        userId: req.session.user?.id,
        course: req.params.slug
      })
      if (progress) {
        res.redirect(`/courses/learning/${req.params.slug}`)
      }

      res.render("courses/show", {
        course: mongooseToObject(course),
        sections: mutipleMongooseToObject(sections),
        lessons: mutipleMongooseToObject(lessons),
      });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /courses/store -> private
  async storeCourse(req, res, next) {
    try {
      const course = new Course({
        name: req.body.name.trim(),
        description: req.body.description.trim(),
        videoIntro: req.file.path,
        category: req.body.category,
        price: +req.body.price,
        userId: req.session.user.id,
        options: {
          totalTime: 0, // seconds
          totalStudent: 0,
          targets: JSON.parse(req.body.targets),
        }
      });
      await course.save();

      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [GET] /courses/:slug/sections -> private
  async showSections(req, res, next) {
    try {
      const course = await Course.findOne({
        slug: req.params.slug
      });

      const sections = await Section.find({
        course: req.params.slug
      })

      res.render("courses/sections", {
        course: mongooseToObject(course),
        sections: mutipleMongooseToObject(sections),
      });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /courses/:slug/section/store -> private
  async storeSection(req, res, next) {
    try {
      const section = new Section({
        title: req.body.title.trim(),
        course: req.params.slug,
        options: {
          totalTime: 0
        }
      });
      await section.save();
      res.redirect("back");
    } catch (error) {
      next(error)
    }
  }

  // [DELETE] /courses/:slug/section/:idSection -> private
  async deleteSection(req, res, next) {
    try {
      await Section.deleteOne({
        course: req.params.slug,
        sectionNumber: req.params.idSection,
      });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [PATCH] /courses/:slug/section/:idSection/edit -> private
  async editSection(req, res, next) {
    try {
      await Section.updateOne({
        course: req.params.slug,
        sectionNumber: req.params.idSection,
      }, {
        title: req.body.title.trim()
      });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [GET] /courses/:slug/section/:idSection/lessons -> private
  async showLessons(req, res, next) {
    try {
      const course = await Course.findOne({
        slug: req.params.slug
      });
      const section = await Section.findOne({
        course: req.params.slug,
        sectionNumber: req.params.idSection,
      });
      const lessons = await Lesson.find({
        course: req.params.slug,
        sectionNumber: req.params.idSection,
      });

      res.render('courses/lessons', {
        course: mongooseToObject(course),
        section: mongooseToObject(section),
        lessons: mutipleMongooseToObject(lessons),
      })
    } catch (error) {
      next(error);
    }
  }

  // [POST] /courses/:slug/section/:idSection/lesson/store -> private
  async storeLesson(req, res, next) {
    try {
      const result = await cloudinary.api.resource(req.file.filename, {
        resource_type: 'auto',
        media_metadata: true,
      });
      const lesson = new Lesson({
        course: req.params.slug,
        sectionNumber: req.params.idSection,
        title: req.body.title.trim(),
        url: req.file.path,
        options: {
          duration: result.duration,
          type: result.resource_type,
        }
      });
      await lesson.save();

      await Course.updateOne({
        slug: req.params.slug
      }, {
        $inc: { "options.totalTime": result.duration }
      });

      await Section.updateOne({
        course: req.params.slug,
        sectionNumber: req.params.idSection,
      }, {
        $inc: { "options.totalTime": result.duration }
      });

      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [DELETE] /courses/:slug/section/:idSection/lesson/:idLesson -> private
  async deleteLesson(req, res, next) {
    try {
      await Lesson.deleteOne({
        course: req.params.slug,
        sectionNumber: req.params.idSection,
        lessonNumber: req.params.idLesson,
      });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [PATCH] /courses/:slug/section/:idSection/lesson/:idLesson/edit/:field
  async editLesson(req, res, next) {
    try {
      const fieldUpdate = req.params.field;
      const update = {};

      if (fieldUpdate === "title") {
        update.title = req.body.title.trim();
      } else if (fieldUpdate === "url") {
        update.url = req.file.path;
      }
      await Lesson.updateOne({
        course: req.params.slug,
        sectionNumber: req.params.idSection,
        lessonNumber: req.params.idLesson,
      }, update);
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [DELETE] /courses/:slug
  async delete(req, res, next) {
    try {
      await Course.delete({ slug: req.params.slug });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [DELETE] /courses/:slug/force
  async forceDelete(req, res, next) {
    try {
      await Course.deleteOne({ slug: req.params.slug });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [PATCH] /courses/:slug/restore
  async restore(req, res, next) {
    try {
      await Course.restore({ slug: req.params.slug });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }
  // [PATCH] /courses/:slug/edit/:field
  async editCourse(req, res, next) {
    try {
      // Chưa xử lí trường hợp thay đổi giá dẫn tới thay đổi category course 
      const update = {};
      update[req.params.field] = req.body[req.params.field].trim();

      await Course.updateOne(
        { slug: req.params.slug },
        update
      );

      res.redirect("back");
    } catch (error) {
      next(error)
    }
  }

  // [POST] /courses/handle-form-actions
  async handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        try {
          await Course.delete({ id: { $in: req.body.courseIds } });
          res.redirect("back");
        } catch (error) {
          next(error);
        }
        break;
      default:
        res.json({ message: "Action is invalid" });
    }
  }

  // [GET] /courses/learning/:slug
  async learningCourse(req, res, next) {
    try {
      const course = await Course.findOne({
        slug: req.params.slug
      });
      const sections = await Section.find({
        course: req.params.slug
      });
      const lessons = await Lesson.find({
        course: req.params.slug
      });
      let progress = await Progress.findOne({
        userId: req.session.user?.id,
        course: req.params.slug
      });
      if (!progress) {
        progress = new Progress({
          userId: req.session.user?.id,
          course: req.params.slug,
          lessonLatest: 1,
          progress: 0,
        });
        await progress.save();
      }
      const idQuery = +req.query.lesson;
      if (idQuery && idQuery > progress.lessonLatest) {
        progress.lessonLatest = idQuery;
        progress.progress = 0;
        await progress.save();
      }
      const lessonCurrent = lessons.find(lesson => lesson.lessonNumber === idQuery);
      // Increase total student learned 
      await Course.updateOne({
        slug: req.params.slug
      }, {
        $inc: { "options.totalStudent": 1 }
      })

      res.render("courses/learning", {
        course: mongooseToObject(course),
        sections: mutipleMongooseToObject(sections),
        lessons: mutipleMongooseToObject(lessons),
        progress: mongooseToObject(progress),
        lessonCurrent: mongooseToObject(lessonCurrent),
        layout: "learning"
      });
    } catch (error) {
      next(error);
    }
  }
  // Update progress of user in course when user click to quit course
  // [PATCH] /courses/progress/update
  async updateProgress(req, res, next) {
    try {
      await Progress.updateOne({
        _id: req.body.idProgress
      }, req.body.progress);
    } catch (error) {
      next(error);
    }
  }
  // [GET] /courses/progresses/:userId
  async getProgresses(req, res, next) {
    try {
      const progresses = await Progress.find({ userId: req.params.userId })
      res.json(progresses)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new CourseController();
