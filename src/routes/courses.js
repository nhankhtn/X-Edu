const express = require("express");
const router = express.Router();

const courseController = require("../app/controllers/CourseController");
const { uploadVideo } = require("../configs/db/multer");

router.get("/create", courseController.createCourse);
router.post("/store", uploadVideo.single('video'), courseController.storeCourse);
// router.get("/:id/edit", courseController.edit);
// Section.hbs 
router.get("/:id/sections", courseController.showSections);
router.post("/:id/section/store", courseController.storeSection);
router.delete("/:id/section/:idSection", courseController.deleteSection);
router.patch("/:id/section/:idSection/edit", courseController.editSection);
// Lesson.hbs
router.get("/:id/section/:idSection/lessons", courseController.showLessons);
router.post("/:id/section/:idSection/lesson/store", uploadVideo.single('video'), courseController.storeLesson);
router.delete("/:id/section/:idSection/lesson/:idLesson", courseController.deleteLesson);
router.patch("/:id/section/:idSection/lesson/:idLesson/edit/:slug", courseController.editLesson);

router.post("/handle-form-actions", courseController.handleFormActions);
// router.put("/:id", uploadVideo.single('video'), courseController.update);
router.patch("/:id/restore", courseController.restore);
router.patch("/:id/edit/:slug", courseController.editCourse); // edit title or description of course
router.delete("/:id", courseController.delete);
router.delete("/:id/force", courseController.forceDelete);
router.get("/:slug", courseController.showCourse);
router.get("/learning/:slug", courseController.learningCourse);
router.patch("/progress/update", courseController.updateProgress);

module.exports = router;
