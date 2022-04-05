const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;


// const ReviewSchema = new Schema ({
//     review: String,
//     rating: Number,
//     view: String, 
//     author: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     }
    
// }) 

// module.exports = mongoose.model('Review', ReviewSchema);