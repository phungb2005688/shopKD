const jwt = require("jsonwebtoken");
const User = require("../models/User");

class TokenMiddleware {
    async checkUser(req, res, next) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.json({
                    status: "bad",
                    msg: "Token not found"
                });
            }

            const decodedToken = await jwt.decode(token, process.env.TOKEN_KEYWORD, (err) => {
                if (err) {
                    return res.json({
                        status: "bad",
                        msg: "Mã thông báo trái phép hoặc không hợp lệ!"
                    });
                }
            });

            if (!decodedToken) {
                return res.json({
                    status: "bad",
                    msg: "Không cho phép!!!",
                });
            }
            next();

        } catch (error) {
            console.log(error.message);
        }
    }
    async checkAdmin(req, res, next) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.json({
                    status: "bad",
                    msg: "Token not found"
                });
            }

            const decodedToken = await jwt.decode(token, process.env.ADMIN_KEYWORD, (err) => {
                if (err) {
                    return res.json({
                        status: "bad",
                        msg: "Mã thông báo trái phép hoặc không hợp lệ!"
                    });
                }
            });


            if (!decodedToken) {
                return res.json({
                    status: "bad",
                    msg: "Không cho phép!",
                });
            }
            if (decodedToken.user.username !== "ntmyphung") {
                return res.json({
                    status: "bad",
                    msg: "Bạn không phải là quản trị viên. Bạn không được phép sử dụng tài nguyên này."
                })
            }
            next()

        } catch (error) {
            console.log(error.message);
        }
    }
    async checkAll(req, res, next) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.json({
                    status: "bad", msg: "Token not found"
                });
            }

            const decodedAsAdminToken = await jwt.decode(token, process.env.ADMIN_KEYWORD);
            const decodedAsUserToken = await jwt.decode(token, process.env.TOKEN_KEYWORD);

            if (!decodedAsAdminToken || !decodedAsUserToken) {
                return res.json({
                    status: "bad",
                    msg: "Không cho phép!!",
                });
            }

            decodedAsAdminToken
                ? (req.admin = decodedAsAdminToken.admin)
                : (req.user = decodedAsUserToken.user);

            next();

        } catch (error) {
            console.log(error.message);
        }
    }


    async checkPrivacy(req, res, next) {
        try {
            const token = req.headers.authorization?.split(" ")[1]
            const decodedUser = jwt.decode(token, process.env.TOKEN_KEYWORD)
            const currentUser = await User.findById(req.params.id)

            if (
                currentUser._id.toString() !== decodedUser.user._id &&
                decodedUser.user.username !== process.env.ADMIN_LOGIN) {
                return res.json({
                    status: "bad", msg: "Bạn không có quyền thay dổi và xóa tài khoản của người khác"
                });
            }

            next();
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = TokenMiddleware;