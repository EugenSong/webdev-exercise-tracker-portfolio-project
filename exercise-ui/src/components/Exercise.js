import React from 'react';
import { BsEraserFill } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';

function Exercise({ exercise, onDelete, onEdit }) {

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><BsEraserFill onClick={() => onEdit(exercise)} /></td>
            <td><TbTrash onClick={() => onDelete(exercise._id)} /></td>
        </tr>
    );
}

export default Exercise;