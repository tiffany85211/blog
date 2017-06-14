import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class Comment extends Component {

  render() {
    return (
      <div className="Comment">
        <div className="Comment-header">
          <div className="Comment-user">
            {this.props.comment.user}
          </div>
          <div className="Comment-time">
            {this.props.comment.time}
          </div>
        </div>
        <div className="Comment-content">
          {this.props.comment.content}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    postid: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
