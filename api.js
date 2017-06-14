const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/blog_test');
console.log(`MONGODB_URI = ${process.env.MONGODB_URI}`);

const db = mongoose.connection;
db.on('error', (err) => {
  console.log('connection error', err);
});
db.once('open', () => {
  console.log('connected.');
});

// const Schema = mongoose.Schema;
// const PostSchema = new Schema(
//     {
//         id: ,
//         user: String,
//         content: String,
//         time: String,
//         comments: ,
//     }
// );

// const Post = mongoose.model('post', PostSchema);


const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});


// router.get('/', (req, res) => {
//   res.json(data);
// });

// router.get('/post', (req, res) => {
//   res.json(data);
// });

// router.post('/post', (req, res) => {
//   console.log('api post success (post)');
//   const d = {
//     id: req.body.id,
//     user: req.body.user,
//     content: req.body.content,
//     time: req.body.time,
//     comments: [],
//   };
//   data.push(d);
//   res.send(d);
// });

// router.post('/comment', (req, res) => {
//   console.log('api post success (comment)');
//   const c = req.body;
//   data[c.postid].comments.push(c);
//   res.send(c);
// });

module.exports = router;
