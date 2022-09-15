const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");

const coverImageBasePath = "/uploads/banners"

const bannersSchema = new mongoose.Schema({
    titleBanner: {
        type: String,
        require: true
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    coverImageName: {},

});

bannersSchema.virtual("coverImagePath").get(function () {
    if (this.coverImageName != null) {
        return path.join("/", coverImageBasePath, this.coverImageName);
    }
});

module.exports = mongoose.model("Banners", bannersSchema);
module.exports.coverImageBasePath = coverImageBasePath;