const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    likedMovies: [{
        type: Schema.Types.ObjectId,
        ref: "Movie"
        }],
    },
    {
        timestamps: true
    }
    );


module.exports = model('User', userSchema);
