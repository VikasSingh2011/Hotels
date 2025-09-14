const passport = require("passport");//this line tell that we use passport in our project
const LocalStrategy = require("passport-local").Strategy;//this line tell that we use passport-local in our project 
const Person = require("./models/Person");//import the person.js file in server.js


//Initialize passport middleware
passport.use(new LocalStrategy(async (username, password, done) => {
  //Authentication logic here 
  try{//here we complete verification function
    //console.log('Received credentials:', username, password);//this line print the username and password in the console
    const user = await Person.findOne({username});//this line check the username and password in the database
    if(!user)
      return done(null, false, {message: 'Incorrect username.'});//if username not found then this message print

    const isPasswordMatch = await user.comparePassword(password);//this line compare the password in the database
    if(isPasswordMatch){
      return done(null, user);//username and pass match then move to next phase
    }else{
      return done(null, false, {message: 'Incorrect password.'});//if password not match then this message print
    }
  }catch(error){
    return done(error);
  }
}))//this line tell that we use LocalStrategy in our project)



module.exports = passport;//we have export this passport in server.js