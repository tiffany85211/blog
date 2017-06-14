import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';

class Blog extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentWillMount() {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.log(err));
    console.log(process.env.NODE_ENV);
    console.log(`MONGODB_URI = ${process.env.MONGODB_URI}`);
  }

  render() {
    const posts = this.state.data;
    return (
      <div className="Blog-postLists">
        <ul>
          {posts.map((post, i) =>
            <Link to={`/post/${post._id}`}>
              <div className="Blog-Post" key={i}>
                <div className="Blog-Post-title">
                  {post.title}
                </div>
                <div className="Blog-Post-time">
                  {post.time}
                </div>
              </div>
            </Link>).reverse()}
        </ul>
      </div>
    );
  }
}

export default Blog;
