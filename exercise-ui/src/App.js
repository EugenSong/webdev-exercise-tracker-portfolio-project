import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AiOutlineCopyrightCircle } from 'react-icons/ai'

import MainHomePage from './pages/MainHomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';


function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header>
        <h1>Your Personal Workout Log</h1>
        <p>Enter your exercise and specify each field.</p>

        <Router>
          <div className="App-router">
            <Route path="/" exact>
              <MainHomePage setExerciseToEdit={setExerciseToEdit} />
            </Route>

            <Route path="/add-exercise">
              <CreateExercisePage />
            </Route>

            <Route path="/edit-exercise">
              <EditExercisePage exerciseToEdit={exerciseToEdit} />
            </Route>
          </div>
        </Router>

      </header>

      <footer>
        <AiOutlineCopyrightCircle />2022 Eugene Song
      </footer>
    </div >
  );
}

export default App;