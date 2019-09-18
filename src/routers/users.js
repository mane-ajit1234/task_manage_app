const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const multer = require("multer");
const { sendWelcomeEmail } = require("../emails/account");


router.post("/users",async (req, res) =>{
    try{
        const user = new User(req.body);
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();

        res.status(201).send({user, token});
    }
    catch(e){
        res.status(400).send(e);
    }
})

router.get("/users", auth, async (req, res) =>{
    try{
        const users = await User.find({}); 
        if(users.length > 0){
            res.status(200).send(users);
        }
        else{
            res.status(404).send("No data found");
        }
    }
    catch(e){
        res.status(500).send("Unable to fetch users");
    }
    // User.find({}).then((users) =>{
    //     if(users.length > 0){
    //         res.status(200).send(users);
    //     }
    //     else{
    //         res.status(404).send("No data found");
    //     }
    // }).catch((error) =>{
    //     res.status(500).send("Unable to fetch users");
    // })
});

router.get("/users/:id", async (req, res) =>{
    try{
        const id = req.params.id;
        const user = await User.findById(id); 
        if(!user){
            return res.status(404).send("No data found");
        }
        res.status(200).send(user);
    }
    catch(e){
        res.status(500).send("Unable to fetch user");
    }
    // const id = req.params.id;

    // User.findById(id).then((user) =>{
    //     if(!user){
    //         return res.status(404).send("No data found");
    //     }
    //     res.status(200).send(user);
    // }).catch((error) =>{
    //     res.status(500).send("Unable to fetch user");
    // })
})

router.delete("/users/:id", async (req, res) =>{
    try{
        const _id = req.params.id;

        const user = await User.findByIdAndDelete(_id);

        if(!user){
            return res.status(404).send("User not found");
        }

        res.status(200).send(user);
    }
    catch(e){
        res.status(500).send(e);
    }
})

router.patch("/users/:id", async (req, res) =>{
    try{
        const updates = Object.keys(req.body);
        const user = await User.findById(req.params.id);

        updates.forEach((update) =>{
            user[update] = req.body[update];
        });

        const updatedUser = await user.save();

        res.status(200).send(user);


    }
    catch(e){
        res.status(500).send(e);
    }
})

router.post("/users/login", async (req, res) =>{
    try {
       
        const user = await User.findByCredentials(req.body.email, req.body.password);
        
        if(!user){
            return res.status(404).send({"message":"User not found"});
        }

        const token = await user.generateAuthToken();

        res.status(200).send({user, token});
    }
    catch(e){
        res.status(500).send(e);
    }
})

router.post("/users/logout", auth, async (req, res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token;
        })

        await req.user.save();

        res.status(200).send({"message":"User logged out"});
    }
    catch(e){
        res.status(500).send(e);
    }
});

const upload = multer({
    
    "limits":{
        "fileSize":1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.endsWith(".jpg") && !file.originalname.endsWith('.jpeg') && !file.originalname.endsWith(".png")){
            return cb(new Error("Please upload an image file"));
        }

        cb(undefined, true);
    }
})


router.post("/users/me/avtar", auth , upload.single("avtar") , async (req, res) =>{
    
    req.user.avtar = req.file.buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) =>{
    res.status(400).send({"message":error.message});
});

router.delete("/users/me/avtar", auth, async(req, res) =>{
    try{
        req.user.avtar = undefined;
        await req.user.save();
        res.send();
    }
    catch(e){
        res.status(500).send({"message":e})
    }
    
})

router.get("/users/avtar/:id",  async(req, res) =>{
    try{
        const _id = req.params.id;
        const user = await User.findById(_id);

        if(!user || !user.avtar){
            throw new Error("Profile pic not found");
        }

        res.set("Content-Type", "image/jpeg");
        res.send(user.avtar);
    }
    catch(e){
        res.status(500).send({"message":e});
    }
})

module.exports = router;