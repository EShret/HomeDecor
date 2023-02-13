const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const jimp = require("jimp");
const Frames = require("../model/frames");

const uploadPath = path.join("static", Frames.coverImageBasePath);
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
        const frames = await Frames.find()
            .sort("createdDate")
            .lean();
        res.json(frames);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/", upload.single("file"), async (req, res, next) => {
    const fileName = req.file != null ? req.file : null;

    const imgResize = jimp.read(fileName.path).then(img => {
        return img
            .quality(80)
            .resize(600, jimp.AUTO)
            .write("static/uploads/paintings/resize/" + fileName.filename)
    }).catch(err => {
        console.log(err);
    })

    const frames = new Frames({
        frameName: req.body.frameName,
        frameSize: req.body.frameSize,
        frameСost: req.body.frameСost,

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
                    const newFrames = frames.save();
                    await res.status(201).json(newFrames);
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
            .resize(600, jimp.AUTO)
            .write("static/uploads/paintings/resize/" + req.body.imgName)
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



router.get("/:id", getFramesID, (req, res) => {
    res.json(res.frames);
});


router.patch("/:id", getFramesID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                res.frames.frameName = req.body.frameName;
                res.frames.frameSize = req.body.frameSize;
                res.frames.frameСost = req.body.frameСost;

                res.frames.coverImageName = req.body.coverImageName;
                try {
                    await res.frames.save();
                    res.status(200).json({
                        frameName: res.frames.frameName,
                        frameSize: res.frames.frameSize,
                        frameСost: res.frames.frameСost,

                        coverImageName: res.frames.coverImageName,
                    });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


router.delete("/:id", getFramesID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                try {
                    await res.frames.remove();
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
                        .resize(600, jimp.AUTO)
                        .write("static/uploads/paintings/resize/" + newFileName.filename)
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


async function getFramesID(req, res, next) {
    let frames;
    try {
        frames = await Frames.findOne({ _id: req.params.id }).exec();
        if (frames === null) {
            return res.status(404).json({ message: "Страницы не существует" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.frames = frames;
    next();
}


module.exports = router;