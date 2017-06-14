import React, { Component } from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddPost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleAddPost = this.handleAddPost.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  handleContentChange(e) {
    this.setState({ content: e.target.value });
  }

  handleAddPost() {
    const { title, content } = this.state;
    const newPost = {
      title,
      content,
      time: new Date().toLocaleString(),
    };
    this.setState({ title: '', content: '' });
    if (title.length === 0) {
      alert('Type a title!');
    } else if (content.length === 0) {
      alert('Type a post!');
    } else {
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


  render() {
    return (
      <div className="AddPost">
        <div className="Add-title">
          <TextField
            style={{ width: '89%' }}
            hintText="Title..."
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </div>
        <br />
        <div className="Add-content">
          <TextField
            hintText="Write a post..."
            value={this.state.content}
            style={{ width: '80%' }}
            textareaStyle={{ border: 'visible' }}
            multiLine={true} rows={20} rowsMax={20}
            onChange={this.handleContentChange}
          />
        </div>
        <br />
        <div className="Add-publish">
          <Link to="/">
            <RaisedButton
              label="Publish"
              primary={true}
              style={{ margin: '0% 1% 1% 43%' }}
              onClick={this.handleAddPost}
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default AddPost;
