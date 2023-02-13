const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");

const coverImageBasePath = "/uploads/reviewers"

const reviewersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    coverImageName: {},
});

reviewersSchema.virtual("coverImagePath").get(function () {
    if (this.coverImageName != null) {
        return path.join("/", coverImageBasePath, this.coverImageName);
    }
});

module.exports = mongoose.model("Reviewers", reviewersSchema);
module.exports.coverImageBasePath = coverImageBasePath;