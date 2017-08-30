const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ideaSchema = new Schema({
    content: { type: String, required: true },
    impact: { type: String, required: true },
    ease: { type: String, required: true },
    confidence: { type: String, required: true }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Idea', ideaSchema);
