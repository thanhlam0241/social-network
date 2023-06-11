const multer = require('multer');
const express = require('express');
const path = require('path')
const router = express.Router()

const authenticate = require('../../../middleware/authenToken');
const authorizeRole = require('../../../middleware/authorizeRole');
const ROLES = require('../../../models/const/role');

const avatarController = require('../../../controller/Account/avatarController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/avatar"), // cb -> callback
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const handleMultipartData = multer({
    storage
}).single("image");

router.route('/:id').get(avatarController.getAvatarImage);

router.use(authenticate)
router.use(authorizeRole([ROLES.USER]))

router.route('/').get(avatarController.getMyAvatarImage).post(async (req, res, next) => {
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
},
    avatarController.uploadAndSaveAvatar
);

router.route('/:id').get(avatarController.getAvatarImage)

module.exports = router;

