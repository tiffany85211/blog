import React, { Component } from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Post from './Post';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      postCount: 0,
      user: '',
      inputPost: '',
      inputUser: '',
    };
    this.handleShowPost = this.handleShowPost.bind(this);
    this.handleShowUser = this.handleShowUser.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleAddPost = this.handleAddPost.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
  }

  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then((data) => {
        const postCount = data.length;
        this.setState({ posts: data, postCount });
        console.log('ComponentDidMount');
      })
      .catch(err => console.error(err));
  }

  handleShowPost(e) {
    this.setState({ inputPost: e.target.value });
  }

  handleShowUser(e) {
    this.setState({ inputUser: e.target.value });
  }

  handleChangeUser(e) {
    if (e.key === 'Enter') {
      this.setState({ user: this.state.inputUser, inputUser: '' });
    }
  }

  handleAddPost() {
    const { user, inputPost } = this.state;
    let postCount = this.state.postCount;

    if (user.length === 0) {
      alert('Type UserName!');
    } else if (inputPost.length === 0) {
      alert('Type a Post!');
    } else {
      const posts = this.state.posts.slice();
      const newPost = {
        id: postCount,
        time: new Date().toLocaleString(),
        user,
        content: inputPost,
        comments: [],
      };
      posts.push(newPost);
      postCount += 1;
      this.setState({ posts, inputPost: '', postCount });

      fetch('/api/post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })
      .then(res => console.log(res.json()))
      .catch((err) => { console.error('add post api failed', err); });
    }
  }

  handleAddComment(inputComment, commentCount, postid) {
    if (inputComment.length === 0) {
      alert('Type a comment!');
    } else {
      const posts = this.state.posts.slice();
      const newComment = {
        id: commentCount,
        postid,
        time: new Date().toLocaleString(),
        user: this.state.user,
        content: inputComment,
      };
      posts[postid].comments.push(newComment);
      this.setState({ posts });
      fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      })
      .then(res => console.log(res.json()))
      .catch((err) => { console.error('Add Post api failed', err); });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Message Board</h1>
          <div className="App-User">
            Current User: {this.state.user}
            <br />
            <TextField
              hintText="Change UserName"
              style={{ width: '20%' }}
              inputStyle={{ color: 'white' }}
              value={this.state.inputUser}
              onChange={this.handleShowUser}
              onKeyDown={this.handleChangeUser}
            />
          </div>
        </div>
        <div className="App-addPost">
          <TextField
            hintText=". Write your post..."
            value={this.state.inputPost}
            style={{ width: '50%' }}
            textareaStyle={{ border: 'visible' }}
            multiLine={true} rows={8} rowsMax={8}
            onChange={this.handleShowPost}
          />
          <br />
          <RaisedButton
            label="Post"
            primary={true}
            style={{ margin: '0% 1% 1% 43%' }}
            onClick={this.handleAddPost}
          />
        </div>
        <div className="App-Posts">
          <ul>
            {this.state.posts.map((post, i) =>
              <Post
                key={i}
                post={this.state.posts[i]}
                onAddComment={this.handleAddComment}
              />)}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
