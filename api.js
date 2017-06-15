const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_test');
console.log(`MONGODB_URI = ${process.env.MONGODB_URI}`);

const db = mongoose.connection;
db.on('error', (err) => {
  console.log('connection error', err);
});
db.once('open', () => {
  console.log('connected.');
});

const Schema = mongoose.Schema;
const BlogSchema = new Schema(
  {
    title: String,
    content: String,
    time: String,
  });
const Blog = mongoose.model('Blog', BlogSchema);

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

router.get('/posts', (req, res) => {
  Blog.find()
      .then(posts => res.json(posts));
  console.log('api GET posts success');
});

router.get('/post/:post_id', (req, res) => {
  const id = req.params.post_id;
  Blog.findById((id), (err, post) => {
    if (err) return console.log(err);
    res.json(post);
    return console.log(`getPost ${id}: ${post}`);
  });
});

router.post('/post', (req, res) => {
  const newpost = new Blog(req.body);
  newpost.save((err) => {
    if (err) return console.log(err);
    return res.send({ state: "api POST post success"});
  });
});

// router.put('/post/:post_id', (req, res) => {
//   const id = req.params.post_id;
//   Blog.findByIdAndUpdate(id, req.body)
//       .catch(err => console.log(err));
//   console.log('api PUT post success');
// });

module.exports = router;
