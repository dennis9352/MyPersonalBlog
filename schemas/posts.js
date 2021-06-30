const mongoose = require("mongoose");

const { Schema } = mongoose;

const postsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String
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
    }
});

module.exports = mongoose.model("Posts",postsSchema)