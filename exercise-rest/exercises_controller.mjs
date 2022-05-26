import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

// - exclude app.use(express.urlencoded) b/c we aren't sending POST request as form
// - exclude express.static('public') b/c we arent serving any static files

function validate(req, res, name, reps, weight, unit, date) {
    // === undefined for empty property
    if (name === undefined || reps === undefined || weight === undefined || unit === undefined || date === undefined) {
        res.status(400).json( { Error: 'Invalid request' } )
    }
    // === null b/c empty string 
    else if (name.length < 1 || name === null) {
        res.status(400).json( { Error: 'Invalid request' } )
    }
    else if (reps <= 0) {
        res.status(400).json( { Error: 'Invalid request' } )
    }
    else if (weight <= 0) {
        res.status(400).json( { Error: 'Invalid request' } )
    }
    else if (unit !== 'kgs' && unit !== 'lbs') {
        res.status(400).json( { Error: 'Invalid request' } )
    }
    else if (isDateValid(date) === false) {
        res.status(400).json( { Error: 'Invalid request' } )
    }

    return
}

/**
 * CREATE a new exercise with name, reps, weight, unit and date
 */
app.post('/exercises', (req, res) => {
    validate(req, res, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)

    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise)
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            res.status(400).json({ Error: 'Request failed' });
        })
});

/**
 * RETRIEVE ALL or no exercises
 * All movies are returned. If empty --> response will be empty array 
 */
app.get('/exercises', (req, res) => {
    // filter used for empty array 
    let filter = {};
    exercises.findExercise(filter, '', 0)
        .then(exercise => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });
});

/**
 * RETRIEVE ONE exercise corresponding to the ID provided in the URL.
 */
 app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });
});

// UPDATE/replaces exercise by id
app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            // if numUpdated === 1 --> then found 
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid request' });
        });
});

// DELETES exercise by id
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});