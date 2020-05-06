import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';
import ListPage from './pages/list';
import LoginPage from './pages/login';
import DetailsPage from './pages/details';
import NewPage from './pages/new';
import EditPage from './pages/edit';
import Database from './db';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.db = new Database("pre1");
    this.state = {
      sync: {
        checked: false,
        success: false,
        authenticated: false
      }
    }

    this.startSync = this.startSync.bind(this);
  }

  startSync() {
    console.log("starting sync");
    const syncing = this.db.tryToSync();
    this.setState({ sync: { checked: true, success: true, authenticated: true } });
    syncing.on("error", (err) => {
      console.log("sync err");
      console.error(err);
      this.setState({ sync: { checked: true, success: false, authenticated: !(err.hasOwnProperty("status") && err.status === 401) } });
    });
  }

  componentDidMount() {
    this.startSync();
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Nav syncstate={this.state.sync} />
          <div className="app-content">
            <Route exact path="/" component={(props) => <ListPage {...props} db={this.db} />} />
            <Route exact path="/login" component={(props) => <LoginPage {...props} db={this.db} syncstate={this.state.sync} startsync={this.startSync} />} />
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
