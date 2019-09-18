const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser:true,
    useCreateIndex:true
});

// const User = mongoose.model("User",{
//     name:{
//         type: String,
//         required:true
//     },
//     age:{
//         type : Number,
//         required:true,
//         validate(value){
//             if(value < 0){
//                 throw new Error("Age must be a positive number");
//             }
//         }
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error("Email is invalid");
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         minLength : 7,
//         validate(value){
//             if(value.length <= 6){
//                 throw new Error("Password must be greater than 6 characters");
//             }
//             else if(value.toLowerCase().includes("password")){
//                 throw new Error("Password can not contain password character");
//             }
//         }
//     }
// });

// const user1 = new User(
//     {
//         name:"JKLM", 
//         age: 29,
//         email:"asdas@afad.com",
//         password:"passwordasd"
//     }
// );

// user1.save().then((result) => {
//     console.log(result);
// }).catch((error) =>{
//     console.log(error);
// })

// const Task = mongoose.model("Task",{
//     description:{
//         type: String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type : Boolean,
//         default:false
//     }
// });

// const task1 = new Task({
//     "description":"Learning NodeJs",
//     "completed":false
// }) 

// task1.save().then((result) =>{
//     console.log(result);
// }).catch((error) =>{
//     console.log(error);
// })