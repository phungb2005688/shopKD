const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

mongoose.connect(
    "mongodb+srv://phungnguyen:phung9996@cluster0.2w78veq.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() =>{
      console.log("Connected database");  
    })
    .catch((err)=>{
        console.log(err);
    });

app.get("/", (req,res) => {
    res.send("kkkkkkkkkk");
});

app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
    console.log("Server started!!");
});