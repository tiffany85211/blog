import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import Comment from './Comment';
import './App.css';

class Post extends Component {

  constructor() {
    super();
    this.state = {
      commentCount: 0,
      inputComment: '',
    };
    this.handleShowComment = this.handleShowComment.bind(this);
    this.handleCommentKeyDown = this.handleCommentKeyDown.bind(this);
  }

  handleShowComment(e) {
    this.setState({ inputComment: e.target.value });
  }

  handleCommentKeyDown(e) {
    if (e.key === 'Enter') {
      let { inputComment, commentCount } = this.state;
      this.props.onAddComment(inputComment, commentCount, this.props.post.id);
      commentCount += 1;
      this.setState({ inputComment: '', commentCount });
    }
  }

  render() {
    const comments = this.props.post.comments;
    return (
      <div>
        <div className="Post">
          <div className="Post-header">
            <div className="Post-user">
              {this.props.post.user}
            </div>
            <div className="Post-time">
              {this.props.post.time}
            </div>
          </div>
          <div className="Post-content">
            {this.props.post.content}
          </div>
        </div>
        <div className="Post-Comments">
          <ul>
            {comments.map((comment, i) =>
              <Comment
                key={i}
                comment={comments[i]}
              />)}
          </ul>
        </div>
        <div className="Post-addComment">
          <TextField
            hintText="Write a comment..."
            value={this.state.inputComment}
            style={{ width: '45%', margin: '0% 2% 0% 30%' }}
            onChange={this.handleShowComment}
            onKeyDown={this.handleCommentKeyDown}
          />
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      postid: PropTypes.number.isRequired,
      time: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  onAddComment: PropTypes.func.isRequired,
};

export default Post;
