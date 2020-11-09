const express = require('express');
const app = express();
const port = 8900;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoURL = "mongodb+srv://abhinav:testpass@internshipdb.3ectb.mongodb.net/workout_app?retryWrites=true&w=majority";
const cors = require('cors');
let db;
app.use(cors());
app.set('json spaces', 2);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/movement_data',(req,res)=>{
    db.collection('test_userData').find( {} ).toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    }); 
});

app.post('/send_movement_data',(req,res) => {
    db.collection('test_userData').insertOne(req.body,(err,result) => {
        if(err){
            throw err
        }
        else{
            res.send('Data Added')
        }
    });
});

MongoClient.connect(mongoURL,{useUnifiedTopology: true, useNewUrlParser: true},(err,client) => {
    if(err) console.log(err);
    db = client.db('workout_app');
    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Server is running on port ${port}`);
    })
})