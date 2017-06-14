import React, { Component } from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

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
    console.log(data);
    // const content = ReactHtmlParser(data.content.replace(/\r?\n/g, '<br />'));
    return (
      <div id={pid} className="Post">
        <div className="title">{data.title}</div>
        <div className="time">{data.time}</div>
        <div className="content">{data.content}</div>
      </div>
    );
  }
}

export default Post;
