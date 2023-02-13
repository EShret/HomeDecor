const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");

const coverImageBasePath = "/uploads/catalogs"

const catalogsSchema = new mongoose.Schema({

    priority: {
        type: Number,
        require: true
    },

    catalogTitle: {
        type: String,
        require: true
    },

    catalogURL: {
        unique: true,
        type: String,
        require: true
    },

    subCatalogsName: {
        type: Array
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    coverImageName: {},

});

catalogsSchema.virtual("coverImagePath").get(function () {
    if (this.coverImageName != null) {
        return path.join("/", coverImageBasePath, this.coverImageName);
    }
});

module.exports = mongoose.model("Catalogs", catalogsSchema);
module.exports.coverImageBasePath = coverImageBasePath;