import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainHomePage from './pages/MainHomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';

// import Navigation from './components/Navigation';

function App() {

  return (
    <div className="App">
      <header>
        <h1>Your Personal Workout Log</h1>
        <p>Enter your the workout and specify any fields.</p>
      </header>
      <footer>2022 Eugene Song</footer>
      <Router>
        <div className="App-router">
          <Route path="/" exact>
            <MainHomePage />
          </Route>
          <Route path="/add-exercise">
            <CreateExercisePage />
          </Route>
          // work on this path later
          <Route path="/edit-exercise">
            <EditExercisePage />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;