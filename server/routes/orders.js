const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Orders = require("../model/orders");

const uploadPath = path.join("static", Orders.coverImageBasePath);
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
        const orders = await Orders.find()
            .sort("-createdDate")
            .lean();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/", upload.single("file"), async (req, res, next) => {
    const fileName = req.file != null ? req.file : null;
    const orders = new Orders({
        CART: JSON.parse(req.body.CART),
        totalCost: req.body.totalCost,
        deliveryType: req.body.deliveryType,
        paymentMethod: req.body.paymentMethod,
        сity: req.body.сity,
        address: req.body.address,
        name: req.body.name,
        phone: req.body.phone,
        insta: req.body.insta,
        email: req.body.email,
        comments: req.body.comments,
    });
    try {
        const newOrders = orders.save();
        await res.status(201).json(newOrders);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get("/:id", getOrdersID, (req, res) => {
    res.json(res.orders);
});


router.patch("/:id", getOrdersID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                res.orders.CART = JSON.parse(req.body.CART);
                res.orders.totalCost = req.body.totalCost;
                res.orders.deliveryType = req.body.deliveryType;
                res.orders.paymentMethod = req.body.paymentMethod;
                res.orders.сity = req.body.сity;
                res.orders.address = req.body.address;
                res.orders.name = req.body.name;
                res.orders.phone = req.body.phone;
                res.orders.insta = req.body.insta;
                res.orders.email = req.body.email;
                res.orders.comments = req.body.comments;
                res.orders.status = req.body.status;
                try {
                    await res.orders.save();
                    res.status(200).json({
                        CART: res.orders.CART,
                        totalCost: res.orders.totalCost,
                        deliveryType: res.orders.deliveryType,
                        paymentMethod: res.orders.paymentMethod,
                        сity: res.orders.сity,
                        address: res.orders.address,
                        name: res.orders.name,
                        phone: res.orders.phone,
                        insta: res.orders.insta,
                        email: res.orders.email,
                        comments: res.orders.comments,
                        status: res.orders.status,
                    });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


router.delete("/:id", getOrdersID, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "Токен не распознан" });
    } else {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.TOKEN, async function (err, decoded) {
            if (err) {
                res.status(403).json({ message: "Токен неправильный" });
            } else {
                try {
                    await res.orders.remove();
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
                try {
                    await res.json(newFileName);
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
});


async function getOrdersID(req, res, next) {
    let orders;
    try {
        orders = await Orders.findOne({ _id: req.params.id }).exec();
        if (orders === null) {
            return res.status(404).json({ message: "Страницы не существует" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.orders = orders;
    next();
}


module.exports = router;