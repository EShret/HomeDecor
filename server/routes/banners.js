const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const jimp = require("jimp");
const Banners = require("../model/banners");

const uploadPath = path.join("static", Banners.coverImageBasePath);
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
        const banners = await Banners.find()
            .sort("createdDate")
            .lean();
        res.json(banners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/", upload.single("file"), async (req, res, next) => {
    const fileName = req.file != null ? req.file : null;

    const imgResize = jimp.read(fileName.path).then(img => {
        return img
            .quality(80)
            .write("static/uploads/banners/resize/" + fileName.filename)
    }).catch(err => {
        console.log(err);
    })

    const banners = new Banners({
        titleBanner: req.body.titleBanner,
        linkBanner: req.body.linkBanner,
        newTabLink: req.body.newTabLink,
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
                    const newBanners = banners.save();
                    await res.status(201).json(newBanners);
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
            .write("static/uploads/banners/resize/" + req.body.imgName)
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


router.get("/:id", getBannersID, (req, res) => {
    res.json(res.banners);
});


router.patch("/:id", getBannersID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                res.banners.titleBanner = req.body.titleBanner;
                res.banners.linkBanner = req.body.linkBanner;
                res.banners.newTabLink = req.body.newTabLink;
                res.banners.coverImageName = req.body.coverImageName;
                try {
                    await res.banners.save();
                    res.status(200).json({
                        titleBanner: res.banners.titleBanner,
                        linkBanner: res.banners.linkBanner,
                        newTabLink: res.banners.newTabLink,
                        coverImageName: res.banners.coverImageName,
                    });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


router.delete("/:id", getBannersID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                try {
                    await res.banners.remove();
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
                        .write("static/uploads/banners/resize/" + newFileName.filename)
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


async function getBannersID(req, res, next) {
    let banners;
    try {
        banners = await Banners.findOne({ _id: req.params.id }).exec();
        if (banners === null) {
            return res.status(404).json({ message: "Страницы не существует" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.banners = banners;
    next();
}


module.exports = router;