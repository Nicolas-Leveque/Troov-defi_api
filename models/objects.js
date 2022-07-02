const mongoose = require('mongoose');
const validator = require('validator');

const objectSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        maxLength: 32,
        set: sanitizeEntries,
    },
    description: {
        type: String,
        required: true,
        maxLength: 140,
        set: sanitizeEntries,
    },
    imageUrl: {
        type: String,
        required: false,
    }
});

function sanitizeEntries(value) {
    return validator.escape(value)
}

const Object = mongoose.model('Object', objectSchema);

module.exports = Object;
