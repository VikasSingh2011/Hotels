const mongoose = require('mongoose');

//Define the Person schema
const personSchema = new mongoose.Schema({
  name:{
      type: String,
      required: true//it means name is must require during filling the form
  },
  age:{
    type: Number
  },
  work:{
    type: String,
    enum: ['chef','waiter','manager'],//it means they accept only these 3 values
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true//it means they accept only unique email in the Form
  },
  address:{
    type: String
  },
  salary:{
    type: Number,
    required: true
  }
});

//create Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;//we have export this person in server.js