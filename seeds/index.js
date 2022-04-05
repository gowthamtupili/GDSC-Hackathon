const mongoose = require('mongoose');
// const cities = require('./cities');
// const { places, descriptors } = require('./seedHelpers');
const MReview = require('../models/mainreview');


mongoose.connect('mongodb://localhost:27017/gdsc-hackathon')
    .then(() => {
        console.log("Connection OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO ERROR!")
        console.log(err);  
    });


// const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await MReview.deleteMany({});
    for (let i = 0; i < 10; i++) {
        // const random1000 = Math.floor(Math.random() * 1000);
        const camp = new MReview({
            author: '624bdcafbafaf1fb1744b092',
            image: `https://randomuser.me/api/portraits/men/${i+1}.jpg`,
            description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero quasi, recusandae iste, quibusdam quam sed numquam error ea provident a, architecto id. A eius perspiciatis minus obcaecati quos vel?',
            
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})