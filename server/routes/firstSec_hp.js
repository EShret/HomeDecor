const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const jimp = require("jimp");
const FirstSec_hp = require("../model/firstSec_hp");

const uploadPath = path.join("static", FirstSec_hp.coverImageBasePath);
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
        const firstSec_hp = await FirstSec_hp.find()
            .sort("createdDate")
            .lean();
        res.json(firstSec_hp);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/", upload.single("file"), async (req, res, next) => {
    const fileName = req.file != null ? req.file : null;

    const imgResize = jimp.read(fileName.path).then(img => {
        return img
            .quality(80)
            .write("static/uploads/fshp/resize/" + fileName.filename)
    }).catch(err => {
        console.log(err);
    })

    const firstSec_hp = new FirstSec_hp({
        title: req.body.title,
        link: req.body.link,
        desc: req.body.desc,

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
                    const newFirstSec_hp = firstSec_hp.save();
                    await res.status(201).json(newFirstSec_hp);
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
            .write("static/uploads/fshp/resize/" + req.body.imgName)
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


router.get("/:id", getFirstSec_hpID, (req, res) => {
    res.json(res.firstSec_hp);
});


router.patch("/:id", getFirstSec_hpID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                res.firstSec_hp.title = req.body.title;
                res.firstSec_hp.link = req.body.link;
                res.firstSec_hp.desc = req.body.desc;
                res.firstSec_hp.coverImageName = req.body.coverImageName;
                try {
                    await res.firstSec_hp.save();
                    res.status(200).json({
                        title: res.firstSec_hp.title,
                        link: res.firstSec_hp.link,
                        desc: res.firstSec_hp.desc,
                        coverImageName: res.firstSec_hp.coverImageName,
                    });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


router.delete("/:id", getFirstSec_hpID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                try {
                    await res.firstSec_hp.remove();
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
                        .write("static/uploads/fshp/resize/" + newFileName.filename)
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


async function getFirstSec_hpID(req, res, next) {
    let firstSec_hp;
    try {
        firstSec_hp = await FirstSec_hp.findOne({ _id: req.params.id }).exec();
        if (firstSec_hp === null) {
            return res.status(404).json({ message: "Страницы не существует" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.firstSec_hp = firstSec_hp;
    next();
}


module.exports = router;