const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");

const coverImageBasePath = "/uploads/paintings"

const framesSchema = new mongoose.Schema({
    frameName: {
        type: String,
        require: true
    },

    frameSize: {
        type: String,
        require: true
    },

    frameСost: {
        type: Number,
        require: true
    },

    quantity: {
        type: Number,
        default: 1,
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    coverImageName: {},

});

framesSchema.virtual("coverImagePath").get(function () {
    if (this.coverImageName != null) {
        return path.join("/", coverImageBasePath, this.coverImageName);
    }
});

module.exports = mongoose.model("Frames", framesSchema);
module.exports.coverImageBasePath = coverImageBasePath;