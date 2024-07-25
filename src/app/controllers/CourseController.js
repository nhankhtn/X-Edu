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
        userId: course?.userId,
        courseId: course?.id
      });
      const lessons = await Lesson.find({
        userId: course?.userId,
        courseId: course?.id
      });

      res.render("courses/show", {
        course: mongooseToObject(course),
        sections: mutipleMongooseToObject(sections),
        lessons: mutipleMongooseToObject(lessons),
      });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /courses/create -> private
  createCourse(req, res, next) {
    res.render("courses/create");
  }

  // [POST] /courses/store -> private
  async storeCourse(req, res, next) {
    try {
      const course = new Course({
        name: req.body.name.trim(),
        description: req.body.description.trim(),
        targets: JSON.parse(req.body.targets),
        videoIntro: req.file.path,
        category: req.body.category,
        price: +req.body.price,
        userId: req.session.user.id,
        options: {
          totalTime: 0, // seconds
          totalStudent: 0,
        }
      });
      await course.save();

      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [GET] /courses/:id/sections -> private
  async showSections(req, res, next) {
    try {
      const course = await Course.findOne({
        userId: req.session.user?.id,
        id: req.params.id,
      });
      const sections = await Section.find({
        userId: req.session.user?.id,
        courseId: req.params.id,
      })

      res.render("courses/sections", {
        course: mongooseToObject(course),
        sections: mutipleMongooseToObject(sections),
      });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /courses/:id/section/store -> private
  async storeSection(req, res, next) {
    try {
      const section = new Section({
        title: req.body.title.trim(),
        courseId: req.params.id,
        userId: req.session.user?.id,
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

  // [DELETE] /courses/:id/section/:idSection -> private
  async deleteSection(req, res, next) {
    try {
      await Section.deleteOne({
        userId: req.session.user?.id,
        courseId: req.params.id,
        sectionNumber: req.params.idSection,
      });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [PATCH] /courses/:id/section/:idSection/edit -> private
  async editSection(req, res, next) {
    try {
      await Section.updateOne({
        userId: req.session.user?.id,
        courseId: req.params.id,
        sectionNumber: req.params.idSection,
      }, req.body);
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [GET] /courses/:id/section/:idSection/lessons -> private
  async showLessons(req, res, next) {
    try {
      const course = await Course.findOne({
        userId: req.session.user?.id,
        id: req.params.id,
      });
      const section = await Section.findOne({
        userId: req.session.user?.id,
        courseId: req.params.id,
        sectionNumber: req.params.idSection,
      });
      const lessons = await Lesson.find({
        userId: req.session.user?.id,
        courseId: req.params.id,
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

  // [POST] /courses/:id/section/:idSection/lesson/store -> private
  async storeLesson(req, res, next) {
    try {
      const result = await cloudinary.api.resource(req.file.filename, {
        resource_type: 'video',
        media_metadata: true,
      });
      const lesson = new Lesson({
        userId: req.session.user?.id,
        courseId: req.params.id,
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
        userId: req.session.user?.id,
        id: req.params.id,
      }, {
        $inc: { "options.totalTime": result.duration }
      });

      await Section.updateOne({
        userId: req.session.user?.id,
        courseId: req.params.id,
        sectionNumber: req.params.idSection,
      }, {
        $inc: { "options.totalTime": result.duration }
      });

      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [DELETE] /courses/:id/section/:idSection/lesson/:idLesson -> private
  async deleteLesson(req, res, next) {
    try {
      await Lesson.deleteOne({
        userId: req.session.user?.id,
        courseId: req.params.id,
        sectionNumber: req.params.idSection,
        lessonNumber: req.params.idLesson,
      });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [PATCH] /courses/:id/section/:idSection/lesson/:idLesson/edit/:slug
  async editLesson(req, res, next) {
    try {
      const fieldUpdate = req.params.slug;
      const update = {};
      if (fieldUpdate === "title") {
        update.title = req.body.title.trim();
      } else if (fieldUpdate === "url") {
        update.url = req.file.path;
      }
      await Lesson.updateOne({
        courseId: req.params.id,
        sectionNumber: req.params.idSection,
        lessonNumber: req.params.idLesson,
      }, update);
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [DELETE] /courses/:id
  async delete(req, res, next) {
    try {
      await Course.delete({ id: req.params.id });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [DELETE] /courses/:id/force
  async forceDelete(req, res, next) {
    try {
      await Course.deleteOne({ id: req.params.id });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // [PATCH] /courses/:id/restore
  async restore(req, res, next) {
    try {
      await Course.restore({ id: req.params.id });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }
  // [PATCH] /courses/:id/edit/:slug
  async editCourse(req, res, next) {
    try {
      // Chưa xử lí trường hợp thay đổi giá dẫn tới thay đổi category course 
      const update = {};
      update[req.params.slug] = req.body["new-value"].trim();

      await Course.updateOne(
        { id: req.params.id },
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
  // [GET] /courses/learning/:slug?lesson=?
  // Phân tích
  /*
  - Nếu người dùng click vô href /courses/learning/:slug thì sẽ chuyển hướng sang 
  bài học hiện tại của người dùng (progress.lessonLatest) 
  -> /courses/learning/:slug?id=progress.lessonLatest
  - Nếu người dùng mới bắt đầu học thì sẽ chuyển hướng sang bài học đầu tiên của khóa học
  và tạo một progress mới cho người dùng
  -> /courses/learning/:slug?id=1
  - Nếu người dùng truy cập vào href /courses/learning/:slug?id=2 thì sẽ chuyển hướng sang bài học thứ 2
  của khóa học và cập nhật progress của người dùng
  */
  async learningCourse(req, res, next) {
    try {

      const course = await Course.findOne({
        slug: req.params.slug
      });
      const sections = await Section.find({
        userId: course?.userId,
        courseId: course?.id
      });
      const lessons = await Lesson.find({
        userId: course?.userId,
        courseId: course?.id
      });
      let progress = await Progress.findOne({
        userId: req.session.user?.id,
        courseId: course.id,
      });

      if (!progress) {
        progress = new Progress({
          userId: req.session.user?.id,
          courseId: course.id,
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
  // [PATCH] /courses/learning/:slug/progress/update
  async updateProgress(req, res, next) {
    try {
      await Progress.updateOne({
        _id: req.body.idProgress
      }, {
        progress: req.body.progress,
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new CourseController();
