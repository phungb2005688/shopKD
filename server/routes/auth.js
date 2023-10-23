const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
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

        if(username === "ntmyphung") {
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

        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = await new User({
            username,
            password: hashedPass,
            fullname,
            gender
        });

        const savedUser = await newUser.save();
        const token = await jwt.sign({ user: existUser }, "tokensecret");

        res.json({
            status: "Ok",
            msg: "Bạn đã đăng ký thành công.",
            user: savedUser,
            token,
        });

    } catch (error) {
        console.log(error.message);
    }
});

//Login
router.post("/login", async (req, res) => {
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
        const token = await jwt.sign({ user: existUser }, "tokensecret");

        // const decodedToken = await jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MmY4YjZjMDYxZjBkMjc1NzRjNGJmMyIsInVzZXJuYW1lIjoibmd1eWVucGh1bmciLCJwYXNzd29yZCI6IiQyYiQxMCRITVpteTYzdmcyZW16bWUxOHc2c01PcmZTMU1keUplU3QwYnNhL2xVY0xGbTBGLmpoa242LiIsImNyZWF0ZWRBdCI6IjIwMjMtMTAtMThUMDc6Mzg6MjAuNjQwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMTAtMThUMDc6Mzg6MjAuNjQwWiIsIl9fdiI6MH0sImlhdCI6MTY5NzYxODIyMn0.lWqKDKP28OBDf-lVCwQUhiNb0vsAGFgDFBzr9wXu3ao",
        //     "tokensecret");
        // console.log(decodedToken);

        res.json({
            status: "Ok",
            msg: "Bạn đã đăng nhập thành công.",
            user: existUser,
            token,
        });

    } catch (error) {
        console.log(error.message);
    }
});

// Admin Login
router.post("/admin", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.json({
                status: "bad",
                msg: "Bạn chưa nhập vào thông tin !!!",
            });
        }

        if (!username !== "myphung") {
            return res.json({
                status: "bad",
                msg: "Tên người dùng không hợp lệ !!!",
            });
        }
        if (!password !== "myphung") {
            return res.json({
                status: "bad",
                msg: "Mật khẩu đã được nhập sai !!!",
            });
        }
        const token = jwt.sign({ user: { username, password }}, "tokensecret")

        res.json({
            status: "Ok",
            msg: "Bạn đã đăng nhập với tư cách quản trị viên.",
            token,
        });

    } catch (error) {
        console.log(error.message);
    }
});
module.exports = router;