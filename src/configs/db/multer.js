require("dotenv").config()
const cloudinary = require("./cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");



const storageImage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "image-courses",
        format: async () => "jpg"
    }
});

const storageVideo = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'video-courses',
        allowed_formats: ['mp4', 'avi'],
        resource_type: 'video',
        transformation: [{ width: 640, height: 480, crop: 'limit' }]
    }
});

const uploadImage = multer({ storage: storageImage });
const uploadVideo = multer({ storage: storageVideo });


module.exports = { uploadImage, uploadVideo };




// Config upload image into mongodb
// const path = require("path");
// const multer = require("multer");
// const url = "mongodb://localhost:27017/f8_course_dev";


// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, "src/uploads");
//     },
//     filename(req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });

// const uploadImage = multer({
//     storage,
//     fileFilter(req, file, cb) {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             console.log("Only jpg & png & ipeg file supported!");
//             cb(null, false);
//         }
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 2
//     },
// });
// module.exports = uploadImage;    
