const express = require("express");
const router = express.Router();

const courseController = require("../app/controllers/CourseController");
const { uploadVideo } = require("../configs/db/multer");

router.post("/store", uploadVideo.single('video'), courseController.storeCourse);
// router.get("/:id/edit", courseController.edit);
// Section.hbs 
router.get("/:slug/sections", courseController.showSections);
router.post("/:slug/section/store", courseController.storeSection);
router.delete("/:slug/section/:idSection", courseController.deleteSection);
router.patch("/:slug/section/:idSection/edit", courseController.editSection);
// Lesson.hbs
router.get("/:slug/section/:idSection/lessons", courseController.showLessons);
router.post("/:slug/section/:idSection/lesson/store", uploadVideo.single('video'), courseController.storeLesson);
router.delete("/:slug/section/:idSection/lesson/:idLesson", courseController.deleteLesson);
router.patch("/:slug/section/:idSection/lesson/:idLesson/edit/:field", courseController.editLesson);

router.post("/handle-form-actions", courseController.handleFormActions);
// router.put("/:id", uploadVideo.single('video'), courseController.update);
router.patch("/:slug/restore", courseController.restore);
router.patch("/:slug/edit/:field", courseController.editCourse); // edit title or description of course
router.delete("/:slug", courseController.delete);
router.delete("/:slug/force", courseController.forceDelete);
router.get("/progresses/:userId", courseController.getProgresses);// Get progress of courses 
router.patch("/progress/update", courseController.updateProgress);
router.get("/:slug", courseController.showCourse);
router.get("/learning/:slug", courseController.learningCourse);

module.exports = router;
