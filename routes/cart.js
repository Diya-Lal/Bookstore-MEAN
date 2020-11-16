
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('',{useNewUrlParser:true})
.then(db => {
    console.log("Database connected");
    console.log("Cart");
  }).catch(error => console.log("Could not connect to mongo db " + error));;

const BookSchema = mongoose.Schema({
    id:Number,
    name:String,
    price:Number,
    img:String,
    number:Number
})

const BookModel = mongoose.model('cart',BookSchema);

router.post('/', function(req, res, next){
    console.log("cart post")
    const book = req.body;
    console.log(book);
    BookModel
    .create(book)
    .then(book=> {
        console.log('success')
        BookModel
        .find()
        .exec()
        .then(cartbook=>  {     
            res.json(cartbook);
        }
            )   
    }
        )    
})

router.get('/', function(req, res, next){
    BookModel
    .find()
    .exec()
    .then(cartbook=> { 
        res.json(cartbook);
    }
        )      
})

router.patch('/:id', function(req, res, next){
    const patchUpdate = req.body;   
    const bookId = req.params.id;
    BookModel
    .updateOne({id  : bookId}, {$set: patchUpdate})
    .exec()
    .then(cart => {
        res.json(cart)
    });    
})

router.put('/:id', function(req, res, next){
    const book = req.body;
    const bookId = req.params.id
    BookModel
    .updateOne({id  : bookId}, {$set: book})
    .exec()
    .then(cart => {
        res.json(cart)
    });  
})

router.delete('/:id', function(req, res, next){
    const book = req.body;
    const bookId = req.params.id
    const idbook = parseInt(book.id)
    BookModel
    .deleteOne({id  : bookId})
    .exec()
    .then(cart => {
        res.json(cart)
    });  
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

router.delete('/', function(req, res, next){
    BookModel
    .deleteMany({})
    .exec()
    .then(cart => {
        res.json(cart)
    });  
})
module.exports = router;