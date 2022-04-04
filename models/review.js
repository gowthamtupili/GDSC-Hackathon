const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PersonSchema = new Schema ({
    name: String,
    rollNumber: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    
}) 

module.exports = mongoose.model('Review', ReviewSchema);