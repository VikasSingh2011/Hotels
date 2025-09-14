const mongoose = require('mongoose');
const bcrypt = require('bcrypt');//import bcrypt to hash the password

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
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

//Hash the password before saving the person document
personSchema.pre('save', async function(next){//this function call before saving the data in the database
  const person = this;//here this represent the current document being saved
  if(!person.isModified('password')) return next();//if password is not modified then move to next phase 

  try{
    const salt = await bcrypt.genSalt(10);//generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(person.password, salt);//hash the password using the generated salt
    person.password = hashedPassword;//replace the plain text password with the hashed password
    next();
  }
  catch(err){
    return next(err);//if error occers then move to next phase
  }
})

personSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    //use bcrypt to compare the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
      throw error;
  }
}

//create Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;//we have export this person in server.js