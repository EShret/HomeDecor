const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const jimp = require("jimp");
const Reviewers = require("../model/reviewers");

const uploadPath = path.join("static", Reviewers.coverImageBasePath);
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
        const reviewers = await Reviewers.find()
            .sort("createdDate")
            .lean();
        res.json(reviewers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/", upload.single("file"), async (req, res, next) => {
    const fileName = req.file != null ? req.file : null;

    const imgResize = jimp.read(fileName.path).then(img => {
        return img
            .quality(80)
            .write("static/uploads/reviewers/resize/" + fileName.filename)
    }).catch(err => {
        console.log(err);
    })

    const reviewers = new Reviewers({
        name: req.body.name,

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
                    const newReviewers = reviewers.save();
                    await res.status(201).json(newReviewers);
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
            .write("static/uploads/reviewers/resize/" + req.body.imgName)
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


router.get("/:id", getReviewersID, (req, res) => {
    res.json(res.reviewers);
});


router.patch("/:id", getReviewersID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                res.reviewers.name = req.body.name;
                res.reviewers.coverImageName = req.body.coverImageName;
                try {
                    await res.reviewers.save();
                    res.status(200).json({
                        name: res.reviewers.name,
                        coverImageName: res.reviewers.coverImageName,
                    });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


router.delete("/:id", getReviewersID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                try {
                    await res.reviewers.remove();
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
                        .write("static/uploads/reviewers/resize/" + newFileName.filename)
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


async function getReviewersID(req, res, next) {
    let reviewers;
    try {
        reviewers = await Reviewers.findOne({ _id: req.params.id }).exec();
        if (reviewers === null) {
            return res.status(404).json({ message: "Страницы не существует" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.reviewers = reviewers;
    next();
}


module.exports = router;