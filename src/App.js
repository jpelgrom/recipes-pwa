import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';
import ListPage from './pages/list';
import DetailsPage from './pages/details';
import NewPage from './pages/new';
import EditPage from './pages/edit';
import Database from './db';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.db = new Database("pre1");
    this.state = {
      recipes: []
    }
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Nav />
          <div className="app-content">
            <Route exact path="/" component={(props) => <ListPage {...props} db={this.db} />} />
            <Route exact path="/new" component={(props) => <NewPage {...props} db={this.db} />} />
            <Route exact path="/recipe/:id" component={(props) => <DetailsPage {...props} db={this.db} />} />
            <Route exact path="/recipe/:id/edit" component={(props) => <EditPage {...props} db={this.db} />} />
          </div>
        </Router>
      </div>
    );
  }

}

export default App;
