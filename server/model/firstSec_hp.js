const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");

const coverImageBasePath = "/uploads/fshp"

const firstSecHPSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    link: {
        type: String,
        require: true
    },

    desc: {
        type: String,
        require: true
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    coverImageName: {},

});

firstSecHPSchema.virtual("coverImagePath").get(function () {
    if (this.coverImageName != null) {
        return path.join("/", coverImageBasePath, this.coverImageName);
    }
});

module.exports = mongoose.model("FirstSecHP", firstSecHPSchema);
module.exports.coverImageBasePath = coverImageBasePath;