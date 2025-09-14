const express = require('express')//this line tell that we need a exprees.
const app = express();//here we store the express function in app.
const db = require('./db');//db.js export data here using this command 
require('dotenv').config();//line tell that we use dotenv file in our project
const passport = require('./auth');//this line tell that we use passport in our project 

//different person are send data in different format so we use body-parser is a middleware to parse the JSON data form the request body and convert into a JavaScript object that we can work with in our server.
const bodyParser = require('body-parser');
app.use(bodyParser.json());//line tell that we use body-parser in json format
const PORT = process.env.PORT || 3000;//here we use env file PORT variable if PORT variable not found then they use 3000

//Middleware function
const logRequest = (req, res, next) =>{//this is a middleware function
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);//this line tell that which type of request made to which URL
  next();//next() tell after this line they move to the next middleware function or we can say next phase
}

//after create personRoutes.js folder we not need this code in server.js
//const Person =require('./models/Person');//here import the person.js file in server.js
//after create menuItemRoutes.js folder we not need this code in server.js
//const MenuItem = require('./models/MenuItem');//here import the MenuItem.js file in server.js

app.use(logRequest);//line tell we use logRequest middleware func in our project

app.use(passport.initialize());//line tell that we use passport in our project
//here we add password authentication in this command
const localAuthMiddleware = passport.authenticate("local", { session: false });
//this line tell that we use local strategy in our project and session is false


app.get('/' ,function (req, res){//function have two parameter req and res.
  res.send('Welcome to my Hotel')//function send res.here
})

//now we send the request to save the data
// app.post('/person', async (req,res)=>{//this function call when we hit /person
//     try{
//       const data =req.body//Assuming the request body contains the person data

//       //Create a new Person document using the mongoose model
//       const newPerson = new Person(data);

//       //Save the new person to the databases
//       const response = await newPerson.save();
//       console.log('data saved');
//       res.status(200).json(response);
//     }
//     catch(err){//when try through error then they directly move in catch
//       console.log(err);
//       res.status(500).json({error: 'Internal Server Error'});
//     }
// })

//Now make a request to get all the data of person,Get method to get the person
// app.get('/person', async (req,res) =>{
//   try{
//      const data = await Person.find();//Person.find() is a mongoose method to get all the record from the collection and return them.
//      console.log('data fetched');
//      res.status(200).json(data);
//   }catch(err){
//      console.log(err);
//      res.status(500).json({error: 'Internal Server Error'});
//   }
// })

// app.post('/menuItem', async (req,res)=>{//this function call when hit /menuItem
//   try{
//     const data =req.body//Assuming the request body contains the menuItem data

//     const newMenuItem = new MenuItem(data);//Create a new MenuItem document using the mongoose model
//     //Save the new MenuItem to the databases
//     const response = await newMenuItem.save();
//     console.log('data saved');
//     res.status(200).json(response);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error: 'Internal Server Error'});
//   }
// })

//Make a request to get all the data of menuItem,Get method to get the menuItem
// app.get('/menuItem', async (req,res) =>{
//   try{
//      const data = await MenuItem.find();//MenuItem.find() is a mongoose method to get all the record from the collection and return them.
//      console.log('data fetched');
//      res.status(200).json(data);
//   }catch(err){
//      console.log(err);
//      res.status(500).json({error: 'Internal Server Error'});
//   }
// })

//here workType is a parameter, when parameter change then URL also change 
// app.get('/person/:workType', async (req,res)=>{
//   try{
//    const workType = req.params.workType;//extract work type from URL parameter
//    if(workType =='chef'|| workType == 'manager' || workType == 'waiter'){
//        const response = await Person.find({work: workType});
//        console.log('response fetched');
//        res.status(200).json(response);

//    }else{
//      res.status(404).json({error: 'Invalid work type'});
//    }
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error: 'Internal Server Error'});
//   }
// })

//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//use the routers
app.use('/person', personRoutes);//we use the personRoutes in server.js
app.use('/menuItem', menuItemRoutes);//we use the menuItemRoutes in server.js

app.listen(PORT,()=>{//this is the location of the server
  console.log('listening on port 3000');
})

//post ke through hum data bhejte hai server ko,post method me data bhejne ke liye body-parser ka use karte hai
//get method ke through hum data lete hai server se
//get method me data lene ke liye body-parser ka use nahi karte hai
//post method me data bhejne ke liye hum postman ka use karte hai
//get method me data lene ke liye hum browser ka use karte hai
//postman ek aisa tool hai jisme hum apne request ko test kar sakte hai