import React from 'react';

function Exercise({ exercise }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>Date</td>
        </tr>
    );
}

export default Exercise;