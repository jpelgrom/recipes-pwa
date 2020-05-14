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
        event: "",
        authenticated: false
      }
    }

    this.startSync = this.startSync.bind(this);
  }

  startSync() {
    const syncing = this.db.tryToSync();
    syncing.on("paused", (err) => {
      this.setState({ sync: { checked: true, event: "paused", authenticated: true } });
    }).on("active", () => {
      this.setState({ sync: { checked: true, event: "active", authenticated: true } });
    }).on("denied", (err) => {
      const auth = !(err.hasOwnProperty("status") && err.status === 401);
      this.setState({ sync: { checked: true, event: "denied", authenticated: auth } });
    }).on("error", (err) => {
      const auth = !(err.hasOwnProperty("status") && err.status === 401);
      this.setState({ sync: { checked: true, event: "error", authenticated: auth } });
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
            <Route exact path="/" render={(props) => <ListPage {...props} db={this.db} syncstate={this.state.sync} />} />
            <Route exact path="/login" render={(props) => <LoginPage {...props} db={this.db} syncstate={this.state.sync} startsync={this.startSync} />} />
            <Route exact path="/new" render={(props) => <NewPage {...props} db={this.db} />} />
            <Route exact path="/recipe/:id" render={(props) => <DetailsPage {...props} db={this.db} />} />
            <Route exact path="/recipe/:id/edit" render={(props) => <EditPage {...props} db={this.db} />} />
          </div>
        </Router>
      </div>
    );
  }

}

export default App;
