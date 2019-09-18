const express = require("express");
const router = new express.Router();
const Task = require("../models/Task");

// /tasks?complete=true
// /tasks?limit=1&skip=2
// /tasks?sortBy=field&type=asc
router.get("/tasks", async (req, res) =>{
    try{
        const match = {};
        const options = {};
        options.sort = {};

        if(req.query.completed){
            match.completed = req.query.completed === 'true'
        }

        if(req.query.limit){
            options.limit = parseInt(req.query.limit);
        }

        if(req.query.skip){
            options.skip = parseInt(req.query.skip)
        }

        if(req.query.sortBy){
            options.sort[req.query.sortBy] = req.query.type == 'desc' ? -1 : 1
        }
        
        const tasks = await Task.find(match, null, options);
        if(tasks.length > 0){
            res.status(200).send(tasks);
        }
        else{
            res.status(404).send("No data found");
        }
    }
    catch(e){
        res.status(500).send("Unable to fetch tasks");
    }
    // Task.find({}).then((tasks) =>{
    //     if(tasks.length > 0){
    //         res.status(200).send(tasks);
    //     }
    //     else{
    //         res.status(404).send("No data found");
    //     }
    // }).catch((error) =>{
    //     res.status(500).send("Unable to fetch tasks");
    // })
});

router.get("/tasks/:id", async (req, res) =>{
    try{
        const _id = req.params.id;  
        const task = await Task.findById(_id);

        if(!task){
            return res.status(404).send("No data found");
        }

        res.status(200).send(task);
    }
    catch(e){
        res.status(500).send("Unable to fetch tasks");
    }
    // const _id = req.params.id;  

    // Task.findById(_id).then((task) =>{
    //     if(!task){
    //         return res.status(404).send("No data found");
    //     }

    //     res.status(200).send(task);
    // }).catch((error) =>{
    //     res.status(500).send("Unable to fetch tasks");
    // })
    
});

const deleteTaskAndReturnCount = async (_id) =>{
    await Task.findByIdAndDelete(_id);
    const count =  await Task.countDocuments({"completed":false})
    return count; 
}

router.delete("/tasks/:id", (req, res) =>{
    const _id = req.params.id;

    deleteTaskAndReturnCount(_id).then((count) =>{
        res.status(200).send({"recordsCount":count});
    }).catch((error) =>{
        res.status(500).send("Internal server error");
    })


    // Task.findByIdAndDelete(_id).then((result) =>{
    //     console.log('deleted result',result);

    //     return Task.countDocuments({"completed":true});
    // }).then((count) =>{
    //     console.log('count',count);

    //     res.status(200).send({"recordsCount":count});
    // }).catch((error) =>{
    //     console.log(error);
    //     res.status(500).send("Internal server error");
    // })
})



router.post("/tasks",async (req, res) =>{
    try{
        const task = new Task(req.body);
        const addedTask = await task.save();
        res.status(201).send(addedTask);
    }
    catch(e){
        res.status(400).send(error);
    }
    // const task = new Task(req.body);
    // task.save().then((result) =>{
    //     res.status(201).send(result);
    // }).catch((error) =>{
    //     res.status(400).send(error);
    // })
});

router.patch("/tasks/:id", async (req, res) =>{
    try{
        const _id = req.params.id;
        const updates = Object.keys(req.body);
        const allowedUpdates = ["description", "completed"];
        const isAllowedUpdate = updates.every((update) =>{
            return allowedUpdates.includes(update);
        })
       
        if(!isAllowedUpdate){
            res.status(500).send("Invalid Update");
        }

        //const task = await Task.findByIdAndUpdate(_id, req.body, { new:true, runValidators:true });

        const task = await Task.findById(_id);

        updates.forEach((update) =>{
            task[update] = req.body[update];
        })

        const updatedTask = await task.save();
        
        if(!task){
            return res.status(404).send("No task found to update");
        }

        res.status(200).send(updatedTask);
    }
    catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;