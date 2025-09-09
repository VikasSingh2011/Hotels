const mongoose = require('mongoose');
const Person = require('./models/Person');

//define the mongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'//Replace 'hotels' with your database name
//set up MongoDB connection
mongoose.connect(mongoURL,{
  //these are not needed now due to new version
  // useNewUrlParser: true,//these are mondatary parameter when we make connection
  // useUnifiedTopology: true//this is mondatary parameter when we make connection
})

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;//here we maintain the object

//Define event listeners for databases connection
db.on('connected', () =>{//when connection established then this message Print
  console.log('connected to MongoDB server');
});

db.on('error', (err) =>{//when error occers then this message Print
  console.error('MongoDB connection error',err);
});

db.on('disconnected', () =>{//when connection disconnect then this message Print
  console.log('connected to MongoDB server');
});