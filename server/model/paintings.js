const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");

const coverImageBasePath = "/uploads/paintings"

const paintingsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    sizePrice: {
        type: Array
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    coverImageName: {},

});

paintingsSchema.virtual("coverImagePath").get(function () {
    if (this.coverImageName != null) {
        return path.join("/", coverImageBasePath, this.coverImageName);
    }
});

module.exports = mongoose.model("Paintings", paintingsSchema);
module.exports.coverImageBasePath = coverImageBasePath;