const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const jimp = require("jimp");
const Paintings = require("../model/paintings");

const uploadPath = path.join("static", Paintings.coverImageBasePath);
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
        const paintings = await Paintings.find()
            .sort("-createdDate")
            .lean();
        res.json(paintings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", upload.single("file"), async (req, res, next) => {
    const fileName = req.file != null ? req.file : null;

    var imgResize;
    if (req.body.orientation === 'horizontal') {
        imgResize = jimp.read(fileName.path).then(img => {
            return img
                .resize(217, jimp.AUTO)
                .write("static/uploads/paintings/resize/" + fileName.filename)
        }).catch(err => {
            console.log(err);
        })
    } else if (req.body.orientation === 'vertical') {
        imgResize = jimp.read(fileName.path).then(img => {
            return img
                .resize(jimp.AUTO, 217)
                .write("static/uploads/paintings/resize/" + fileName.filename)
        }).catch(err => {
            console.log(err);
        })
    }

    const paintings = new Paintings({
        title: req.body.title,
        orientation: req.body.orientation,
        printSizePost: JSON.parse(req.body.printSizePost),

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
                    const newPaintings = paintings.save();
                    await res.status(201).json(newPaintings);
                } catch (err) {
                    res.status(400).json({ message: err.message });
                }
            }
        });
    }
});


router.post("/convertFile", async (req, res, next) => {
    var imgResize;
    if (req.body.imgOrientation === 'horizontal') {
        imgResize = jimp.read(req.body.imgPath).then(img => {
            return img
                .resize(217, jimp.AUTO)
                .write("static/uploads/paintings/resize/" + req.body.imgName)
        }).catch(err => {
            console.log(err);
        })
    } else if (req.body.imgOrientation === 'vertical') {
        imgResize = jimp.read(req.body.imgPath).then(img => {
            return img
                .resize(jimp.AUTO, 217)
                .write("static/uploads/paintings/resize/" + req.body.imgName)
        }).catch(err => {
            console.log(err);
        })
    }

    try {
        imgResize,
            await res.status(201).json('ok');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



router.get("/:id", getPaintingsID, (req, res) => {
    res.json(res.paintings);
});


router.patch("/:id", getPaintingsID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                res.paintings.title = req.body.title;
                res.paintings.orientation = req.body.orientation;
                res.paintings.printSizePost = JSON.parse(req.body.printSizePost);

                res.paintings.coverImageName = req.body.coverImageName;
                try {
                    await res.paintings.save();
                    res.status(200).json({
                        title: res.paintings.title,
                        orientation: res.paintings.orientation,
                        printSizePost: res.paintings.printSizePost,

                        coverImageName: res.paintings.coverImageName,
                    });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


router.delete("/:id", getPaintingsID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                try {
                    await res.paintings.remove();
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

                var imgResize;
                if (req.body.orientation === 'horizontal') {
                    imgResize = jimp.read(newFileName.path).then(img => {
                        return img
                            .resize(217, jimp.AUTO)
                            .write("static/uploads/paintings/resize/" + newFileName.filename)
                    }).catch(err => {
                        console.log(err);
                    })
                } else if (req.body.orientation === 'vertical') {
                    imgResize = jimp.read(newFileName.path).then(img => {
                        return img
                            .resize(jimp.AUTO, 217)
                            .write("static/uploads/paintings/resize/" + newFileName.filename)
                    }).catch(err => {
                        console.log(err);
                    })
                }

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


async function getPaintingsID(req, res, next) {
    let paintings;
    try {
        paintings = await Paintings.findOne({ _id: req.params.id }).exec();
        if (paintings === null) {
            return res.status(404).json({ message: "Страницы не существует" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.paintings = paintings;
    next();
}


module.exports = router;