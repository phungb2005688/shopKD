const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AccountService {
    async update(data) {
        try {
            const updateUser = await User.findByIdAndUpdate(data.id,
                {
                    $set: data.account,
                },
                { new: true }
            );
            return {
                status: "Ok",
                msg: "Tài khoản đã được cập nhật!",
                account: updateUser,
            };

        } catch (error) {
            console.log(error.message);
        }
    }

    async getUser(id) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.json({
                    status: "bad",
                    msg: "Không tìm thấy tài khoản!"
                });
            }
            return user;
        } catch (error) {
            console.log(error.message);
        }
    }

    //get all users
    async getUsers() {
        try {
            const users = await User.find();
            if(!users) {
                return res.json({
                    status: "bad",
                    msg: "Không tìm thấy thông tin!!"
                })
            }
            return users;

        } catch (error) {
            console.log(error.message);
        }
    }
    async deleteUser (id) {
        try {
            await User.findByIdAndDelete(id);
    
            return{
                status: "Ok",
                msg: "Tài khoản đã bị xóa!",
            };
    
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = AccountService;