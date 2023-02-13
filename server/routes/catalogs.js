const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Catalogs = require("../model/catalogs");

const uploadPath = path.join("static", Catalogs.coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/jpg"];
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
        const catalogs = await Catalogs.find()
            .sort("priority")
            .lean();
        res.json(catalogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/", upload.single("file"), async (req, res, next) => {
    const fileName = req.file != null ? req.file : null;
    const catalogs = new Catalogs({
        catalogTitle: req.body.catalogTitle,
        catalogURL: req.body.catalogURL,
        priority: req.body.priority,
        subCatalogsName: JSON.parse(req.body.subCatalogsName),

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
                    const newCatalogs = catalogs.save();
                    await res.status(201).json(newCatalogs);
                } catch (err) {
                    res.status(400).json({ message: err.message });
                }
            }
        });
    }
});


router.get("/:id", getCatalogsID, (req, res) => {
    res.json(res.catalogs);
});


router.get("/url/:url", getCatalogsURL, (req, res) => {
    res.json(res.catalogs);
});



router.patch("/:id", getCatalogsID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                res.catalogs.catalogTitle = req.body.catalogTitle;
                res.catalogs.catalogURL = req.body.catalogURL;
                res.catalogs.priority = req.body.priority;
                res.catalogs.subCatalogsName = JSON.parse(req.body.subCatalogsName);

                res.catalogs.coverImageName = req.body.coverImageName;
                try {
                    await res.catalogs.save();
                    res.status(200).json({
                        catalogTitle: res.catalogs.catalogTitle,
                        catalogURL: res.catalogs.catalogURL,
                        priority: res.catalogs.priority,
                        subCatalogsName: res.catalogs.subCatalogsName,

                        coverImageName: res.catalogs.coverImageName,
                    });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


router.delete("/:id", getCatalogsID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                try {
                    await res.catalogs.remove();
                    res.status(200).json({ message: "Удалено" });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


async function getCatalogsID(req, res, next) {
    let catalogs;
    try {
        catalogs = await Catalogs.findOne({ _id: req.params.id }).exec();
        if (catalogs === null) {
            return res.status(404).json({ message: "Страницы не существует" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.catalogs = catalogs;
    next();
}


async function getCatalogsURL(req, res, next) {
    let catalogs;
    try {
        catalogs = await Catalogs.findOne({ catalogURL: req.params.url }).exec();
        if (catalogs === null) {
            return res.status(404).json({ message: "Страницы не существует" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.catalogs = catalogs;
    next();
}


module.exports = router;