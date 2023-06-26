const multer = require('multer');
const sharp = require('sharp');
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
}, async function (req, res, next) {
    if (!req.file) {
        res.json({ success: false });
    } else {
        /* res.json({ success: true, files: req.files }); */
        /* req.files các file upload return về một array, qua đó chúng ta có thể dễ dàng xử lý  */
        /* chú ý: nhớ rename file lại không nữa sinh ra lỗi. ở đay mình rename theo kích thuước mình resize. */
        await sharp(req.file.path)
            .resize(400, 400)
            .jpeg({ quality: 90 })
            .toFile(
                path.resolve('./uploads/avatar/' + 'resized-' + req.file.filename)
            )

        next();

    }
},
    avatarController.uploadAndSaveAvatar
);

router.route('/:id').get(avatarController.getAvatarImage)

module.exports = router;

