const Router = require("express").Router();
const User = require("../models/User");
const { checkUser, checkAdmin } = require("../middlewares/checkToken");
const jwt = require("jsonwebtoken");

const router = Router;

//update account
router.put("/:id", checkUser, async (req, res) => {
    try {    
        const {username} = req.body.account
        const token = req.headers.authorization?.split(" ")[1]
        const decodedUser = jwt.decode(token, "tokensecret")
        const currentUser = await User.findById(req.params.id)
        // console.log(decodedUser);
        
        if(currentUser._id.toString() !== decodedUser.user._id &&
            decodedUser.username !== "ntmyphung" ) {
            return res.json({
                status: "bad", msg: "Bạn không có quyền thay dổi tài khoản của người khác"
            })
        }

        const existUserWithUsername = await User.findOne({ username });
        if(existUserWithUsername && existUserWithUsername._id.toString() !== decodedUser.user._id) {
            return res.json({
                status: "bad",
                msg: "Tên người dùng đã được sử dụng, vui lòng chọn tên khác!"
            });
        }
        if(username !== "ntntntmyphung") {
            return res.json({
                status: "bad",
                msg: "Tên người dùng này không được sử dụng!!"
            })
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body.account,
            },
            { new: true }
        );
        res.json({
            status: "Ok",
            msg: "Tài khoản đã được cập nhật!",
            account: updateUser,
        });

    } catch (error) {
        console.log(error.message);
    }
});

//get user 
router.get("/:id", checkUser, async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        const decodedUser = jwt.decode(token, "tokensecret")
        const currentUser = await User.findById(req.params.id)
        // console.log(decodedUser);
        
        if(currentUser._id.toString() !== decodedUser.user._id &&
            decodedUser.username !== "ntmyphung" ) {
            return res.json({
                status: "bad", msg: "Bạn không có quyền xem tài khoản của người khác!"
            })
        }
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.json({
                status: "bad",
                msg: "Không tìm thấy tài khoản!"
            });
        }
        res.json({
            status: "Ok",
            account: user,
        });

    } catch (error) {
        console.log(error.message);
    }                                                                 
});

//delete user 
router.delete("/:id", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        const decodedUser = jwt.decode(token, "tokensecret")
        const currentUser = await User.findById(req.params.id)
        // console.log(decodedUser);
        
        if(currentUser._id.toString() !== decodedUser.user._id &&
            decodedUser.username !== "ntmyphung" ) {
            return res.json({
                status: "bad", msg: "Bạn không có quyền xóa tài khoản của người khác!"
            })
        }
        await User.findByIdAndDelete(req.params.id);

        res.json({
            status: "Ok",
            msg: "Tài khoản đã bị xóa!",
        });

    } catch (error) {
        console.log(error.message);
    }                                                                 
});

// router.get("/get/all", checkUser, async (req, res) => {
//     try {
//         const users = await User.find()

//         res.json(users)

//     } catch (error) {
//         console.log(error.message);
//     }                                                                 
// });

module.exports = router;