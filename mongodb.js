//CRUD operations

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;


const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";


MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client)  =>{
    if(error){
        return console.log('Connection Error');
    }
    else{
        console.log("Connected Successfully");
        const db = client.db(databaseName);

        // db.collection('users').insertOne({
        //     "name":"Ajit Mane",
        //     "age":28
        // }, (error, result) =>{
        //     if(error){
        //         return console.log("Unable to Insert");
        //     }

        //     console.log(result.ops);
        // })

        // db.collection('users').insertMany([{
        //     "name":"Tarun Prasad",
        //     "age":27
        // },{
        //     "name":"Bajarang Kadam",
        //     "age":29
        // }], (error, result) => {
        //     if(error){
        //         return console.log("Unable to Insert");
        //     }

        //     console.log(result.ops);
        // })

        // db.collection("tasks").insertMany([{
        //     "description":"Learn NodeJs",
        //     "completed":false
        // },{
        //     "description":"Learn Angular 8",
        //     "completed":false
        // }], (error, result) =>{
        //     if(error){
        //         return console.log("Unable to Insert");
        //     }

        //     console.log(result.ops);
        // })

        // db.collection("users").findOne({"name":"Bajarang Kadam"}, (error, result) =>{
        //     if(error){
        //         return console.log("Unable to find");
        //     }

        //     console.log(result);
        // });

        // db.collection("users").find({"age":28}, (error, result) =>{
        //     if(error){
        //         return console.log("Unable to find");
        //     }

        //     result.toArray((error, result) =>{
        //         if(error){
        //             return console.log("Unable to find");
        //         }

        //         console.log(result)
        //     })
        // })

        // db.collection("tasks").findOne({ "_id":new ObjectId("5d6ccfac5b858e16c4d8ab65")}, (error, result) =>{
        //     if(error){
        //         return console.log("Unable to find");
        //     }

        //     console.log(result);
        // });

        // db.collection("tasks").find({"completed":false}).toArray((error, result) =>{
        //     if(error){
        //         return console.log("Unable to find");
        //     }

        //     console.log(result);
        // })

        // const getIncompletedTasks = (condition) => new Promise((resolve, reject) =>{
        //     db.collection("tasks").find({"completed":false}).toArray((error, result) =>{
        //         if(error){
        //             //console.log("Unable to find");
        //             return reject("Unable to find");
        //         }
    
        //         //console.log(result);
        //         return resolve(result);
        //     })

        // })

        // getIncompletedTasks({"completed":false}).then((result) =>{
        //     console.log(result);
        // }).catch((error) =>{
        //     console.log(error);
        // })

        // const updatePromise = db.collection("users").updateOne({"name":"Bajarang Kadam"}, { $set : { "age":30 }});

        // updatePromise.then((result) =>{
        //     console.log(result);
        // }).catch((result) =>{
        //     console.log(error);
        // })

        // const updateManyPromise = db.collection("users").updateMany({"name":"Ajit Mane"}, { $inc : { "age":1 }});

        // updateManyPromise.then((result) =>{
        //     console.log(result);
        // }).catch((error) => {
        //     console.log("error");
        // })

        // db.collection("users").deleteOne({"name":"Bajarang Kadam"}).then((result) =>{
        //     console.log(result);
        // }).catch((error) =>{
        //     console.log(error)
        // })


        db.collection("users").deleteMany({"name":"Ajit Mane"}).then((result) =>{
            console.log(result);
        }).catch((error) =>{
            console.log(error)
        })

    }
})