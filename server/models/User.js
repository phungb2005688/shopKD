const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    fullname: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    age: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
},
    { timestamps: true }
);
module.exports = model("User", userSchema)