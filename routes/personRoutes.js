const exprees = require('express')//this line tell that we need a exprees.
const router = exprees.Router(); //here we create a router using express
const Person = require("./../models/Person");//here import the person.js file in server.js
const {jwtAuthMiddleware, generateToken} = require('./../jwt');//import the jwtAuthMiddleware in personRoutes.js

//POST route to add a person
router.post('/signup', async (req,res)=>{//this function call when we hit /person
    try{
      const data =req.body//Assuming the request body contains the person data

      //Create a new Person document using the mongoose model
      const newPerson = new Person(data);

      //Save the new person to the databases
      const response = await newPerson.save();
      console.log('data saved');

      const payload = {//this payload use to generate the token
        id: response._id,//here _id is a default id of mongodb
        username: response.username,//here we use username
      }
      console.log(JSON.stringify(payload));//print the payload in the console
      //now we used generateToken here
      const token = generateToken(payload);//this function use to generate the token
      console.log('Generated Token:', token);

      res.status(200).json({response: response, token: token});//here we send the response and token to the user

      //res.status(200).json(response);
    }
    catch(err){//when try through error then they directly move in catch
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
})

//login route
router.post('/login', async (req, res)=>{
  try{
    const {username, password} = req.body;//extract username and password from the request body
    const user = await Person.findOne({username: username});//find the user by username
    //if user does not exist or password does not match then return error
    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error: 'Invalid username or password'});
    }
    //generate a token for the user
    const payload = {//this payload use to generate the token
      id: user.id,//here _id is a default id of mongodb
      username: user.username,//here we use username
    }
    const token = generateToken(payload);//this function use to generate the token
    //return token as response
    res.json({token})//here we send the token to the user
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//Profile route
router.get('/profile',jwtAuthMiddleware, async (req, res)=>{//this function call when we hit /profile
  try{
    const userdata = req.user;//extract user data from the request object
    console.log("user data", userdata);//here we print the user data in the console
    // if (!req.user) {
    //  return res.status(400).json({ error: "User not found in request" });
    // }
    // const userId = req.user.id;  // ✅ safe now
    const userId = userdata.id;//extract user id from the user data
    const user = await Person.findById(userId);//find the user by id
    res.status(200).json({user});//send the user data as response
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

//Now make a request to get all the data of person,Get method to get the person
router.get('/',jwtAuthMiddleware, async (req,res) =>{
  try{
     const data = await Person.find();//Person.find() is a mongoose method to get all the record from the collection and return them.
     console.log('data fetched');
     res.status(200).json(data);
  }catch(err){
     console.log(err);
     res.status(500).json({error: 'Internal Server Error'});
  }
})

//here workType is a parameter, when parameter change then URL also change 
router.get('/:workType', async (req,res)=>{
  try{
   const workType = req.params.workType;//extract work type from URL parameter
   if(workType =='chef'|| workType == 'manager' || workType == 'waiter'){
       const response = await Person.find({work: workType});
       console.log('response fetched');
       res.status(200).json(response);

   }else{
     res.status(404).json({error: 'Invalid work type'});
   }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})
//here we used the put method for update
router.put('/:id', async (req, res)=>{//we have define this id with any name
  try{
    const personID =req.params.id;//Extract the id from the URL parameter
    const updatedPersonData = req.body;//updated data for the person

    const response =await Person.findByIdAndUpdate(personID, updatedPersonData,{
      new: true,//Return the updated document
      runValidators: true,//Run Mongoose validation.validater there in person.js
    })

    if(!response){//this condition will execute when you give the wrong ID
      return res.status(404).json({error: 'Person not found'});
    }

    console.log('data updated');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
//Its for delete the data
router.delete('/:id', async (req, res)=>{
  try{
    const personID =req.params.id;//Extract the id from the URL parameter
    
    //Assuming you have a Person model
    const response =await Person.findByIdAndDelete(personID);
    if(!response){//this condition will execute when you give the wrong ID
      return res.status(404).json({error: 'Person not found'});
    }
    console.log('data delete');
    res.status(200).json({message: 'person Deleted Successfully'});

  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
    }
  })

})

module.exports = router;//here we export this router in server.js