const exprees = require('express')//this line tell that we need a exprees.
const router = exprees.Router(); //here we create a router using express
const Person = require("./../models/Person");//here import the person.js file in server.js
//POST route to add a person
router.post('/', async (req,res)=>{//this function call when we hit /person
    try{
      const data =req.body//Assuming the request body contains the person data

      //Create a new Person document using the mongoose model
      const newPerson = new Person(data);

      //Save the new person to the databases
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err){//when try through error then they directly move in catch
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
})

//Now make a request to get all the data of person,Get method to get the person
router.get('/', async (req,res) =>{
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