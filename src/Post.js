import React, { Component } from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentWillMount() {
    const pid = this.props.match.params.post_id;
    fetch(`/api/post/${pid}`)
        .then(res => res.json())
        .then((data) => { this.setState({ data }); })
        .catch((err) => { console.log(err); });
  }

  render() {
    const pid = this.props.match.params.post_id;
    const data = this.state.data;
    return (
      <div id={pid} className="Post">
        <div className="Post-title"><h2>{data.title}</h2></div>
        <div className="Post-time">{data.time}</div>
        <div className="Post-content">{data.content}</div>
      </div>
    );
  }
}

export default Post;
