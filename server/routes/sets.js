const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const jimp = require("jimp");
const Sets = require("../model/sets");

const uploadPath = path.join("static", Sets.coverImageBasePath);
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
        const sets = await Sets.find()
            .sort("-createdDate")
            .lean();
        res.json(sets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/:id", getSetsId, (req, res) => {
    res.json(res.sets);
});


router.delete("/:id", getSetsId, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                try {
                    await res.sets.remove();
                    res.status(200).json({ message: "Удалено" });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


router.patch("/:id", getSetsId, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                res.sets.titleSets = req.body.titleSets;
                res.sets.paintingsName = JSON.parse(req.body.paintingsName);
                res.sets.catalogName = JSON.parse(req.body.catalogName);
                res.sets.subCatalogName = JSON.parse(req.body.subCatalogName);

                res.sets.coverImageName = req.body.coverImageName;
                try {
                    await res.sets.save();
                    res.status(200).json({
                        titleSets: res.sets.titleSets,
                        catalogName: res.sets.catalogName,
                        subCatalogName: res.sets.subCatalogName,

                        coverImageName: res.sets.coverImageName,
                    });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


router.post("/", upload.array("files", 10), async (req, res, next) => {
    const reqFiles = []
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(req.files[i].filename)
    }

    const imgResize = reqFiles.map((file) => {
        let size = jimp.read("static/uploads/sets/" + file).then(img => {
            return img
                .quality(80)
                .resize(600, jimp.AUTO)
                .write("static/uploads/sets/resize/" + file)
        }).catch(err => {
            console.log(err);
        })

        return size;
    })

    const sets = new Sets({
        titleSets: req.body.titleSets,
        paintingsName: JSON.parse(req.body.paintingsName),
        catalogName: JSON.parse(req.body.catalogName),
        subCatalogName: JSON.parse(req.body.subCatalogName),

        coverImageName: reqFiles,
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
                    const newSets = sets.save();
                    await res.status(201).json(newSets);
                } catch (err) {
                    res.status(400).json({ message: err.message });
                }
            }
        });
    }
});


router.post("/convertFile", async (req, res, next) => {

    const imgName = JSON.parse(req.body.imgName)

    const imgResize = imgName.map((file) => {
        let size = jimp.read("static/uploads/sets/" + file).then(img => {
            return img
                .quality(80)
                .resize(600, jimp.AUTO)
                .write("static/uploads/sets/resize/" + file)
        }).catch(err => {
            console.log(err);
        })

        return size;
    })

    try {
        imgResize;
        await res.status(201).json('ok');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.post("/addFile", upload.array('files', 10), async (req, res, next) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                // const newFileName = req.file != null ? req.file : null;
                const newFileName = []
                for (var i = 0; i < req.files.length; i++) {
                    newFileName.push(req.files[i].filename)
                }

                const imgResize = newFileName.map((file) => {
                    let size = jimp.read("static/uploads/sets/" + file).then(img => {
                        return img
                            .quality(80)
                            .resize(600, jimp.AUTO)
                            .write("static/uploads/sets/resize/" + file)
                    }).catch(err => {
                        console.log(err);
                    })

                    return size;
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


async function getSetsId(req, res, next) {
    let sets;
    try {
        sets = await Sets.findOne({ _id: req.params.id }).exec();
        if (sets === null) {
            return res.status(404).json({ message: "Страницы не существует" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.sets = sets;
    next();
}


module.exports = router;