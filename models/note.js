const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    noteTitle: {
        required: true,
        type: String,
    },
    noteContent: {
        required: true,
        type: String
    },
    noteDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', noteSchema);