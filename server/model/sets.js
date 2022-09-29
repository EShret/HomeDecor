const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");

const coverImageBasePath = "/uploads/sets"

const setsSchema = new mongoose.Schema({

    titleSets: {
        type: String,
        require: true
    },

    paintingsName: {
        type: Array
    },

    catalogName: {
        type: Array
    },

    subCatalogName: {
        type: Array
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    coverImageName: {
        type: Array
    },
});

setsSchema.virtual("coverImagePath").get(function () {
    if (this.coverImageName != null) {
        return path.join("/", coverImageBasePath, this.coverImageName);
    }
});

module.exports = mongoose.model("Sets", setsSchema);
module.exports.coverImageBasePath = coverImageBasePath;