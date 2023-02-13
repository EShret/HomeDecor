const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Subcatalogs = require("../model/subcatalogs");

const uploadPath = path.join("static", Subcatalogs.coverImageBasePath);
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
        const subcatalogs = await Subcatalogs.find()
            .sort("priority")
            // .select("subcatalogTitle")
            .lean();
        res.json(subcatalogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/", upload.single("file"), async (req, res, next) => {
    const fileName = req.file != null ? req.file : null;
    const subcatalogs = new Subcatalogs({
        subcatalogTitle: req.body.subcatalogTitle,
        priority: req.body.priority,

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
                    const newSubcatalogs = subcatalogs.save();
                    await res.status(201).json(newSubcatalogs);
                } catch (err) {
                    res.status(400).json({ message: err.message });
                }
            }
        });
    }
});


router.get("/:id", getSubcatalogsID, (req, res) => {
    res.json(res.subcatalogs);
});


router.patch("/:id", getSubcatalogsID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                res.subcatalogs.subcatalogTitle = req.body.subcatalogTitle;
                res.subcatalogs.priority = req.body.priority;

                res.subcatalogs.coverImageName = req.body.coverImageName;
                try {
                    await res.subcatalogs.save();
                    res.status(200).json({
                        subcatalogTitle: res.subcatalogs.subcatalogTitle,
                        priority: res.subcatalogs.priority,

                        coverImageName: res.subcatalogs.coverImageName,
                    });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


router.delete("/:id", getSubcatalogsID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                try {
                    await res.subcatalogs.remove();
                    res.status(200).json({ message: "Удалено" });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


async function getSubcatalogsID(req, res, next) {
    let subcatalogs;
    try {
        subcatalogs = await Subcatalogs.findOne({ _id: req.params.id }).exec();
        if (subcatalogs === null) {
            return res.status(404).json({ message: "Страницы не существует" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.subcatalogs = subcatalogs;
    next();
}


module.exports = router;