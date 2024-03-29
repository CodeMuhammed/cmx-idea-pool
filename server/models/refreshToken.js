const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    token: { type: String, required: true },
    userEmail: { type: String, required: true }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
