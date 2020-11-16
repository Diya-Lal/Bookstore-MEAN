var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')

var index = require('./routes/index');
var books = require('./routes/books');
var cart = require('./routes/cart');

var port = 3000;

var app = express();



//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder // Angular
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index); //homepage
app.use('/books', books); 
app.use('/cart', cart); 



app.listen(port, function(){
    console.log('Server started on port '+port);
});