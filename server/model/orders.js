const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");

const coverImageBasePath = "/uploads/sets"

const ordersSchema = new mongoose.Schema({

    CART: {
        type: Array
    },

    totalCost: {
        type: Number,
    },

    deliveryType: {
        type: String,
    },

    paymentMethod: {
        type: String,
    },

    сity: {
        type: String,
    },

    address: {
        type: String,
    },

    name: {
        type: String,
    },

    phone: {
        type: String,
    },

    insta: {
        type: String,
    },

    email: {
        type: String,
    },

    comments: {
        type: String,
    },

    status: {
        type: String,
        default: "В ожидании",
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    coverImageName: {},
});

ordersSchema.virtual("coverImagePath").get(function () {
    if (this.coverImageName != null) {
        return path.join("/", coverImageBasePath, this.coverImageName);
    }
});

module.exports = mongoose.model("Orders", ordersSchema);
module.exports.coverImageBasePath = coverImageBasePath;