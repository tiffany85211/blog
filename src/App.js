import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddPost from './AddPost';
import Blog from './Blog';
import Post from './Post';
import './App.css';

injectTapEventPlugin();

const App = () => (
  <BrowserRouter>
    <div className="App">
      <nav>
        <div className="App-header">
          <div className="App-home">
            <Link to="/">
              <h1>My Blog </h1>
            </Link>
          </div>
          <div className="App-addPost">
            <Link to="/addpost">
              <FloatingActionButton>
                <ContentAdd />
              </FloatingActionButton>
            </Link>
          </div>
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={Blog} />
        <Route path="/addpost" component={AddPost} />
        <Route path="/post/:post_id" component={Post} />
      </Switch>
    </div>
  </BrowserRouter>
);


export default App;
