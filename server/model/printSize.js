const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");

const coverImageBasePath = "/uploads/paintings"

const printSizeSchema = new mongoose.Schema({
    prSize: {
        type: String,
        require: true
    },

    pricePost: {
        type: Number,
        require: true
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    coverImageName: {},

});

printSizeSchema.virtual("coverImagePath").get(function () {
    if (this.coverImageName != null) {
        return path.join("/", coverImageBasePath, this.coverImageName);
    }
});

module.exports = mongoose.model("PrintSize", printSizeSchema);
module.exports.coverImageBasePath = coverImageBasePath;