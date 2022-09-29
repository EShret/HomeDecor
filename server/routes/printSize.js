const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const PrintSize = require("../model/printSize");

const uploadPath = path.join("static", PrintSize.coverImageBasePath);
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
        const printSize = await PrintSize.find()
            .sort("-createdDate")
            .lean();
        res.json(printSize);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/", upload.single("file"), async (req, res, next) => {
    const fileName = req.file != null ? req.file : null;
    const printSize = new PrintSize({
        prSize: req.body.prSize,
        pricePost: req.body.pricePost,

        coverImageName: fileName,
    });
    try {
        const newPrintSize = printSize.save();
        await res.status(201).json(newPrintSize);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get("/:id", getPrintSizeID, (req, res) => {
    res.json(res.printSize);
});


router.patch("/:id", getPrintSizeID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                res.printSize.prSize = req.body.prSize;
                res.printSize.pricePost = req.body.pricePost;

                res.printSize.coverImageName = req.body.coverImageName;
                try {
                    await res.printSize.save();
                    res.status(200).json({
                        prSize: res.printSize.prSize,
                        pricePost: res.printSize.pricePost,

                        coverImageName: res.printSize.coverImageName,
                    });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


router.delete("/:id", getPrintSizeID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                try {
                    await res.printSize.remove();
                    res.status(200).json({ message: "Удалено" });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


async function getPrintSizeID(req, res, next) {
    let printSize;
    try {
        printSize = await PrintSize.findOne({ _id: req.params.id }).exec();
        if (printSize === null) {
            return res.status(404).json({ message: "Страницы не существует" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.printSize = printSize;
    next();
}


module.exports = router;