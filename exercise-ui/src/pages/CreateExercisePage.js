import React from 'react';      // import React when creaeting component
import Navigation from '../components/Navigation';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function CreateExercisePage() {

    const history = useHistory();

    // 5 parameters --> create 5 useState functions
    const [name, setName] = useState('');
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert('Success! Exercise was created');
        } else {
            alert(`Fail! Exercise was not created. Status code ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter exercise name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                placeholder="Enter number of reps"
                value={reps}
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input
                type="number"
                palceholder="Enter weight"
                value={weight}
                onChange={e => setWeight(e.target.valueAsNumber)} />
            <select value={unit} name="unit" id="unit-select" onChange={e => setUnit(e.target.value)} >
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
            </select>
            <input
                type="text"
                placeholder="Enter date: MM-DD-YY"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button onClick={addExercise}>Submit Exercise</button>
            <Navigation />

        </div>
    );
}

export default CreateExercisePage