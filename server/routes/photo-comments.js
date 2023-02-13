const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const jimp = require("jimp");
const PhotoComments = require("../model/photo-comments");

const uploadPath = path.join("static", PhotoComments.coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
});


router.get("/", async (req, res) => {
    try {
        const photoComments = await PhotoComments.find()
            .sort("createdDate")
            .lean();
        res.json(photoComments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/", upload.single("file"), async (req, res, next) => {
    const fileName = req.file != null ? req.file : null;

    const imgResize = jimp.read(fileName.path).then(img => {
        return img
            .quality(80)
            .write("static/uploads/photo-comments/resize/" + fileName.filename)
    }).catch(err => {
        console.log(err);
    })

    const photoComments = new PhotoComments({
        title: req.body.title,
        reviewers: JSON.parse(req.body.reviewers),
        sets: JSON.parse(req.body.sets),
        coverImageName: fileName,
    });

    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                try {
                    imgResize;
                    const newPhotoComments = photoComments.save();
                    await res.status(201).json(newPhotoComments);
                } catch (err) {
                    res.status(400).json({ message: err.message });
                }
            }
        });
    }
});


router.post("/convertFile", async (req, res, next) => {
    const imgResize = jimp.read(req.body.imgPath).then(img => {
        return img
            .quality(80)
            .write("static/uploads/photo-comments/resize/" + req.body.imgName)
    }).catch(err => {
        console.log(err);
    })

    try {
        imgResize,
            await res.status(201).json('ok');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get("/:id", getPhotoCommentsID, (req, res) => {
    res.json(res.photoComments);
});


router.patch("/:id", getPhotoCommentsID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                res.photoComments.title = req.body.title;
                res.photoComments.reviewers = JSON.parse(req.body.reviewers);
                res.photoComments.sets = JSON.parse(req.body.sets);

                res.photoComments.coverImageName = req.body.coverImageName;
                try {
                    await res.photoComments.save();
                    res.status(200).json({
                        title: res.photoComments.title,
                        reviewers: res.photoComments.reviewers,
                        sets: res.photoComments.sets,
                        coverImageName: res.photoComments.coverImageName,
                    });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


router.delete("/:id", getPhotoCommentsID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                try {
                    await res.photoComments.remove();
                    res.status(200).json({ message: "Удалено" });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


router.post("/addFile", upload.single("file"), async (req, res, next) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                const newFileName = req.file != null ? req.file : null;

                const imgResize = jimp.read(newFileName.path).then(img => {
                    return img
                        .quality(80)
                        .write("static/uploads/photo-comments/resize/" + newFileName.filename)
                }).catch(err => {
                    console.log(err);
                })

                try {
                    imgResize;
                    await res.json(newFileName);
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


async function getPhotoCommentsID(req, res, next) {
    let photoComments;
    try {
        photoComments = await PhotoComments.findOne({ _id: req.params.id }).exec();
        if (photoComments === null) {
            return res.status(404).json({ message: "Страницы не существует" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.photoComments = photoComments;
    next();
}


module.exports = router;