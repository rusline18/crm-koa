const mongoose = require('../bin/mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;
const schema = new Schema({
    displayName: String,
    username: {
        type: String,
        required: [true, 'Укажите логин'],
        unique: [true, 'Такой пользователь уже зарегестрирован'],
    },
    passwordHash: String,
    salt: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamp: true
});

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        if (password) {
            this.salt = crypto.randomBytes(128).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })
    .get(function () {
        return this._plainPassword;
    });

schema.methods.checkPassword = function (password) {
    if (!password) return false;
    if (!this.passwordHash) return false;
    return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

module.exports = mongoose.model('User', schema);