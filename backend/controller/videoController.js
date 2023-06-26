const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const grpc = require('../utils/proto/grpcServices');

const upload = multer({
    storage: multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, crypto.randomUUID() + '.webm')
        },
        destination: function (req, file, cb) {
            cb(null, path.join(__filename, '..', '..', 'uploads/videos'));
        }
    }),

    // limits: {
    //     fileSize: 20000000
    // },
})

// const uploadImagesToFolder = (folderName) => {
//     return multer({
//         storage: multer.diskStorage({
//             filename: function (req, file, cb) {
//                 cb(null, crypto.randomUUID() + '.jfif')
//             },
//             destination: function (req, file, cb) {
//                 cb(null, folderName)
//             }
//         }),

//         // limits: {
//         //     fileSize: 20000000
//         // },
//     }).array('images', 30)
// }

const makeDir = (folderName) => new Promise((resolver, reject) => {
    fs.mkdir(folderName, resolver);
});

const uploadImagesToFolderMulter = multer({
    storage: multer.diskStorage({
        filename: function (req, file, cb) {
            // cb(null, crypto.randomUUID() + '.jfif')
            cb(null, file.originalname)
        },
        destination: function (req, file, cb) {
            let dir = path.join(__filename, '..', '..', 'uploads/faces', req.id);
            if (!fs.existsSync(dir)) {
                fs.mkdir(dir, () => {
                    cb(null, dir);
                });
            }
            else
                cb(null, dir);
        }
    }),

    // limits: {
    //     fileSize: 20000000
    // },
}).array('images', 30)

const uploadVideo = async (req, res, next) => {
    try {
        console.log(req.body);
        if (!req.file) {
            return res.json({ msgs: "Video/Webm required." });
        }
        console.log(req.file);
        res.status(200).send("Upload video successfully");
    }
    catch (err) {
        res.status(500).send();
    }
}

const setReqId = (req, res, next) => {
    req.id = crypto.randomUUID();
    next();
}

// const uploadImagesCore = (req, res) => {
//     if (!req.file) {
//         return res.json({ msgs: "Images/jpeg required." });
//     }
//     console.log(req.file);
//     res.status(200).send("Upload video successfully");
// }

const uploadImages = async (req, res) => {
    // let dir = path.join(__filename, '..', '..', 'uploads/faces', crypto.randomUUID());
    // await makeDir(dir);
    // const multer = uploadImagesToFolder(dir);
    // console.log(res);
    // console.log(req.body);
    // console.log(req.files);
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ msgs: "Images/jpeg required." });
    }

    let result = await grpc.IdentificationService.identify(req.files[0].destination);
    return res.json(result);
    // console.log(res);
}

module.exports = {
    uploadVideo,
    uploadImages,
    upload,
    setReqId,
    multer: upload.single('video'),
    multerImages: uploadImagesToFolderMulter
}