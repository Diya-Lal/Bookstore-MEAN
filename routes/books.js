
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const { response } = require('express');
mongoose.connect('mongodb://127.0.0.1/Bookstore',{useNewUrlParser:true})
.then(db => {
    console.log("Database connected");
  }).catch(error => console.log("Could not connect to mongo db " + error));;

const BookSchema = mongoose.Schema({
    bookId:Number,
    name:String,
    year:Number,
    price:Number,
    img:String,
    copies:Number
})

const BookModel = mongoose.model('books',BookSchema);

router.get('/', function(req, res, next){
    BookModel
    .find()
    .exec()
    .then(book=> {
        res.setHeader('Access-Control-Allow-Origin', '*');       
        res.json(book);
    }
        )    
})

// router.patch('/:id', function(req, res, next){
//     const quantityUpdate = req.body;   
//     const bookId = parseInt(req.params.id);
//     BookModel
//     .updateOne({id: bookId}, {$set: quantityUpdate})
//     .exec()
//     .then(response => {
//         res.json(response)
//     });    
// })

router.patch('/', function(req, res, next){
    const quantityUpdateArray = req.body;   
    quantityUpdateArray.forEach( (copyUpdate) => {
            BookModel
            .updateOne({id: copyUpdate.id}, {$set: {copies:copyUpdate.copies}})
            .exec()
            .then(response => {
                res.json(response)
            }) 
})  
})

router.get('/:id', function(req, res, next){ 
    const bookId = parseInt(req.params.id);
    BookModel
    .find({id:bookId})
    .exec()
    .then(book => {
        res.json(book)
    });    
})

module.exports = router;