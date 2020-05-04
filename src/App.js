import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';
import ListPage from './pages/list';
import DetailsPage from './pages/details';
import NewPage from './pages/new';
import EditPage from './pages/edit';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes([

    ]);
  }, []);

  return (
    <div className="app">
      <Router>
        <Nav />
        <div className="app-content">
          <Route exact path="/" component={(props) => <ListPage {...props} recipes={recipes} />} />
          <Route exact path="/new" component={NewPage} />
          <Route exact path="/recipe/:id" component={(props) => <DetailsPage {...props} recipe={recipes.find(recipe => recipe._id === props.match.params.id)} />} />
          <Route exact path="/recipe/:id/edit" component={(props) => <EditPage {...props} recipe={recipes.find(recipe => recipe._id === props.match.params.id)} />} />
        </div>
      </Router>
    </div>
  );
}

export default App;
