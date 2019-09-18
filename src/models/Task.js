const mongoose = require("mongoose");
const validator = require("validator");



const taskSchema =new mongoose.Schema({
    description:{
        type: String,
        required:true,
        trim:true
    },
    completed:{
        type : Boolean,
        default:false
    }
},{
    "timestamps":true
});

const Task = new mongoose.model("Task", taskSchema);

taskSchema.pre('save', async function(next){
    const task = this;

    
    next();
})


module.exports = Task;