import React from 'react';      // import React when creaeting component
import Navigation from '../components/Navigation';
import { useState, useEffect } from 'react';
import ExerciseList from '../components/ExerciseList';
import { useHistory } from 'react-router-dom';

function MainHomePage({ setExerciseToEdit }) {

    // useState() returns [initial state, function that updates state]
    const [exercises, setExercise] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const newExercises = exercises.filter(e => e._id !== _id);
            setExercise(newExercises);
        } else {
            console.error(`failed to delete exercise with _id  = ${_id}, status code = ${response.status}`);
        }
    }

    const onEdit = async exercise => {
        setExerciseToEdit(exercise);
        history.push('/edit-exercise')
    }

    const loadExercises = async () => {
        // if promise resolves --> fetch receives a response; not based on status code ; not the same as express fetch (runs in webservice) ; express does not run on browser 
        // fetch() is by default GET
        const response = await fetch('/exercises');
        const data = await response.json();         // returned by REST API
        // cannot do exercises = data b/c React doesn't know that the component has been updated/  rendered 
        setExercise(data);
    }

    // [] is used to display only when mounted 
    // useEffect()'s first parameter cannot be an async function --> have to separate loadExercises() from useEffect b/c loadExercises() is async function
    useEffect(() => {
        console.log('Use Effect loaded once')
        loadExercises()
    }, []);

    return (
        <div>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <Navigation />
        </div>
    )
}

export default MainHomePage