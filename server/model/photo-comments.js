const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");

const coverImageBasePath = "/uploads/photo-comments"

const photoCommentsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    reviewers: {
        type: Array
    },

    sets: {
        type: Array
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    coverImageName: {},
});

photoCommentsSchema.virtual("coverImagePath").get(function () {
    if (this.coverImageName != null) {
        return path.join("/", coverImageBasePath, this.coverImageName);
    }
});

module.exports = mongoose.model("PhotoComments", photoCommentsSchema);
module.exports.coverImageBasePath = coverImageBasePath;