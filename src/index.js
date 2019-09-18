const express = require("express");
const app = express();
require("../src/db/mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userRouter = require("../src/routers/users");
const taskRouter = require("../src/routers/tasks");

const PORT = process.env.PORT;

// app.use((req, res, next) =>{
//     res.status(503).send({"message":"Site under mantainance. Try after some time"});
// })

const multer = require("multer");
const upload = multer({
    "dest":"images",
    "limits":{
        "fileSize":2000000,
    },
    fileFilter(req, file, cb){
        if(!file.originalname.endsWith(".jpg")){
            return cb(new Error("Please upload .jpg file"));
        }
        else{
            cb(undefined, true)
        }
    }
})

app.post("/upload", upload.single("upload") ,(req, res) =>{
    res.send();
})

app.use(express.json());

app.use(userRouter);

app.use(taskRouter);

app.listen(PORT, () =>{
    console.log("Server is up on PORT =>",PORT);
})

//module bcrypt 
const myFunction = async () =>{
    const password = "Ajit1234";
    const hashedPassword = await bcrypt.hash(password,8);

    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare("Ajit12345", hashedPassword);
    console.log(isMatch);
}

//module jsonwebtoken
const myFunction1 = async() =>{
    const token = jwt.sign({"_id":"abc123"}, process.env.JWT_SECRET_KEY , {"expiresIn":"1 hour"});
    console.log("token ",token);

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('data',data);
}

//myFunction1();

//myFunction();