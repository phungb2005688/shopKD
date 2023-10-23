const jwt = require("jsonwebtoken");

const checkUser = async ( req, res, next ) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if(!token) {
            return res.json({
                status: "bad",
                msg: "Token not found"
            });
        }

        const decodedToken = await jwt.decode(token, "tokensecret", (err) => {
            if(err) {
                return res.json({
                    status: "bad",
                    msg: "Mã thông báo trái phép hoặc không hợp lệ!"
                });
            }
        });
        
        if(!decodedToken) {
            return res.json ({
                status: "bad",
                msg: "Không cho phép!!",
            });
        }
        next()
    
    } catch (error) {
        console.log(error.message);
    }
};

const checkAdmin = async ( req, res, next ) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) {
            return res.json({
                status: "bad",
                msg: "Token not found"
            });
        }

        const decodedToken = await jwt.decode(token, "tokensecret", (err) => {
            if(err) {
                return res.json({
                    status: "bad",
                    msg: "Mã thông báo trái phép hoặc không hợp lệ!"
                });
            }
        });
        
        // console.log(decodedToken);

        if(!decodedToken) {
            return res.json ({
                status: "bad",
                msg: "Không cho phép!!",
            });
        }
        if(decodedToken.user.username !== "ntmyphung") {
            return res.json({
                status: "bad", 
                msg: "Bạn không phải là quản trị viên. Bạn không được phép sử dụng tài nguyên này."
            })
        }
        next()
    
    } catch (error) {
        console.log(error.message);
    }
};
module.exports = { checkUser, checkAdmin }