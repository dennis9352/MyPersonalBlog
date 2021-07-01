const mongoose = require("mongoose");

const { Schema } = mongoose;

const postsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true
    },
    context: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    writer: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Posts",postsSchema)