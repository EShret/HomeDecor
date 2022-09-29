const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");

const coverImageBasePath = "/uploads/subcatalogs"

const subcatalogsSchema = new mongoose.Schema({
    subcatalogTitle: {
        type: String,
        require: true
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    coverImageName: {},

});

subcatalogsSchema.virtual("coverImagePath").get(function () {
    if (this.coverImageName != null) {
        return path.join("/", coverImageBasePath, this.coverImageName);
    }
});

module.exports = mongoose.model("Subcatalogs", subcatalogsSchema);
module.exports.coverImageBasePath = coverImageBasePath;