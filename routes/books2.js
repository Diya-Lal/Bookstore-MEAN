
var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;

//Atlas connection string                                                                                                                                        
// const url = "";
// const client = new MongoClient(url);

//router.get('/xxx', function(req, res, next){
    


// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//         const db = client.db("bookstore");
//         const col = db.collection("books");
//         // Construct a document                                                                                                                                                              
//         //           let book = {
//         //             "name": "A Storm of Swords",
//         //             "year": 2000,
//         //             "price":200,
//         //             "img":"./assets/sos.jpg",
//         //             "noOfCopies":2
//         //         }
//         // // Insert a single document, wait for promise so we can read it back
//         //  const p = await col.insertOne(book);
//          // Find one document
//          const myDoc = await col.find().toArray();
//          res.send(myDoc);

//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }

// run().catch(console.dir);

//  });

module.exports = router;