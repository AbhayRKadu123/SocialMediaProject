const mongoose = require('mongoose');
const { type } = require('os');
require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
    
  await mongoose.connect(process.env.mongourl);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Makes the name field mandatory
    },
    socialMedia: {
        type: String,
        required: false, // Optional field
    },
    images: {
        type: [String], // An array of strings for storing image URLs or paths
        required: true, // Makes the field mandatory (optional, depending on your requirement)
    }
});



const UserData = mongoose.model('User', UserSchema);

module.exports=UserData ;