const bcrypt = require("bcrypt");
const User = require("../models/User");

class AuthMiddleware {
    async register (req, res, next) {
        try {
            const { username, password, fullname, gender  } = req.body;
            if (!username || !password || !fullname || !gender) {
                return res.json({
                    status: "bad",
                    msg: "Bạn chưa nhập thông tin !!!",
                });
            }
    
            if (username.length < 4) {
                return res.json({
                    status: "bad",
                    msg: "Tên người dùng phải có ít nhất 4 ký tự!",
                });
            }
            if (username.length > 20) {
                return res.json({
                    status: "bad",
                    msg: "Tên người dùng không vượt quá 20 ký tự!",
                });
            }
    
            if(username === process.env.ADMIN_LOGIN) {
                return res.json({
                    status: "bad",
                    msg: "Tên người dùng này không được sử dụng!!"
                })
            }
    
            if (password.length < 8) {
                return res.json({
                    status: "bad",
                    msg: "Mật khẩu phải có ít nhất 8 ký tự!",
                });
            }
            //Tồn tại người dùng
            const existUser = await User.findOne({ username });
            if (existUser) {
                return res.json({
                    status: "bad",
                    msg: "Tên người dùng đã tồn tại!! Vui lòng chọn tên khác.",
                });
            }

            next()

        } catch (error) {
            console.log(error.message);
        }
    }

    async login (req, res, next) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.json({
                    status: "bad",
                    msg: "Bạn chưa nhập vào thông tin !!!",
                });
            }
    
            //Không tồn tại người dùng
            const existUser = await User.findOne({ username });
            if (!existUser) {
                return res.json({
                    status: "bad",
                    msg: "Không tìm thấy tài khoản này.",
                });
            }
    
            const comparedPass = await bcrypt.compare(password, existUser.password);
    
            if (!comparedPass) {
                return res.json({
                    status: "bad",
                    msg: "Mật khẩu không chính xác!",
                });
            }

            next()
    
        } catch (error) {
            console.log(error.message);
        }
    }

    async admin (req, res, next) {
        try {
            const {username, password} = req.body

            if (!username || !password) {
                return res.json({
                    status: "bad",
                    msg: "Bạn chưa nhập vào thông tin !!!",
                });
            }
    
            if (username !== process.env.ADMIN_LOGIN) {
                return res.json({
                    status: "bad",
                    msg: "Tên người dùng nhập sai !!!",
                });
            }
            if (password !== process.env.ADMIN_PASS) {
                return res.json({
                    status: "bad",
                    msg: "Mật khẩu đã được nhập sai !!!",
                });
            }

            next();

        } catch (error) {
            console.log(error.message);
        }
    }
}
module.exports = AuthMiddleware