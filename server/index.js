require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//Built-Inn middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// Thirrd-party middleware
app.use(cors({ origin: "*" }));

mongoose.connect(
    // "mongodb+srv://phungnguyen:phung9996@cluster0.2w78veq.mongodb.net/?retryWrites=true&w=majority"
    process.env.DB_URI
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

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/accounts", require("./routes/accounts"));

app.listen(process.env.PORT, () => {
    console.log("Server started!!");
});