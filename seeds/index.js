const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors, } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    // useNewUrlParser , useUnifiedTopology , useFindAndModify , and useCreateIndex are no longer supported options. 
    //Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true , and useFindAndModify is false .
})


const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63bc30cfdf4b18b950be9c28',
            title: `${sample(descriptors)}, ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,



            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptate in non modi, impedit odio optio sunt. ',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude],
            },
            images: [

                {
                    url: 'https://res.cloudinary.com/dxvki9bpw/image/upload/v1673441734/YelpCamp/utysjtblutjeg64madlw.jpg',
                    filename: 'YelpCamp/utysjtblutjeg64madlw'

                },
                {
                    url: 'https://res.cloudinary.com/dxvki9bpw/image/upload/v1673441752/YelpCamp/draz1isrog3azscsgth4.jpg',
                    filename: 'YelpCamp/draz1isrog3azscsgth4'
                }
            ]
        })
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close()
})
