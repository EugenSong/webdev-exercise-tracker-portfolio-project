import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
// --> connects to database (MongoDB in my case)
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Defines a Schema (represents the properties of a collection in MongoDB)
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema. (represents documents of a particular collection) -->  returns a Class
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

// ************ Skeleton for CRUD operations ************

const createExercise = async (name, reps, weight, unit, date) => {
    // create an instance of Exercise 
    const exercise = new Exercise( {name: name, reps: reps, weight: weight, unit: unit, date: date} ); 

    // .save() is asynchonous --> returns a promise 
    // .save() inserts a new document 
    // .save() is a mongoose method that persists this user instance into MongoDB
    return exercise.save(); 
};

// returns Query object and calling exec() on it executes the retrieval operation in MongoDB
const findExercise = async (filter) => {
    // filter defines conditions that documents in collection must need in order to result of calling find() 
    const query = Exercise.find(filter);
    return query.exec()
}

const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
    return result.modifiedCount
}

const deleteExercise = async (filter) => {
    const result = await Exercise.deleteMany(filter);
    return result.deletedCount; 
}

/**
 * Find the exercise with the given ID value
 * @param {String} _id
 * @returns
 */
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec()
}

// ********************************************************

export { createExercise, findExercise, replaceExercise, deleteExercise, findExerciseById }; 

