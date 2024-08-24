const mongoose = require('mongoose')

const connectToDb = async (url) =>{
    try {
        await mongoose.connect(url)
        console.log("Sucessfully connected to database");
    } catch (error) {
        console.log('Error :', error.message);
    }
}

module.exports = connectToDb