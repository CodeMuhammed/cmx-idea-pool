const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    token: String
},
{
    timestamps: true
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);