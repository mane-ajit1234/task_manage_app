const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:{
        type : Number,
        required:true,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a positive number");
            }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength : 7,
        validate(value){
            if(value.length <= 6){
                throw new Error("Password must be greater than 6 characters");
            }
            else if(value.toLowerCase().includes("password")){
                throw new Error("Password can not contain password character");
            }
        }
    },
    tokens:[{
        "token":{
            type:String,
            required:true
        }
    }],
    avtar:{
        type:Buffer
    }
},{
    "timestamps":true
}
);

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async(email, password) =>{
    try{
        
        const user = await User.findOne({email:email});

       

        if(!user){
            throw new Error("Unable to login");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new Error("Password not correct");
        }

        return user;
    }
    catch(e){
        throw new Error("Unable to login");
    }
}

//hash password berfore saving
userSchema.pre('save', async function(next){
    const user = this;

    console.log('user before saving',user);

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();

})

const User = mongoose.model('User',userSchema);

module.exports = User;