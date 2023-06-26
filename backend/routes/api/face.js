const express = require('express');
const router = express.Router();
var multer = require('multer');

const FaceController = require('../../controller/Account/faceController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/video"), // cb -> callback
    filename: (req, file, cb) => {
        cb(null, `video-temp.mp4`);
    },
});


const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
}).single("file");

router.route('/detect')
    .post(async (req, res, next) => {
        handleMultipartData(req, res, async (err) => {
            if (err) {
                res.json({ msgs: err.message });
            }
            if (!req.file) {
                return res.json({ msgs: "Please select a file to upload" });
            }
            next();
        }
        )
    }, FaceController.detectFace)

module.exports = router;