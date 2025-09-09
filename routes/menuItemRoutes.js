const exprees = require('express')//this line tell that we need a exprees.
const router = exprees.Router(); //here we create a router using express
const MenuItem = require('./../models/MenuItem');//here import the MenuItem.js file in server.js

router.post('/', async (req,res)=>{//this function call when hit /menuItem
  try{
    const data =req.body//Assuming the request body contains the menuItem data

    const newMenuItem = new MenuItem(data);//Create a new MenuItem document using the mongoose model
    //Save the new MenuItem to the databases
    const response = await newMenuItem.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

//Make a request to get all the data of menuItem,Get method to get the menuItem
router.get('/', async (req,res) =>{
  try{
     const data = await MenuItem.find();//MenuItem.find() is a mongoose method to get all the record from the collection and return them.
     console.log('data fetched');
     res.status(200).json(data);
  }catch(err){
     console.log(err);
     res.status(500).json({error: 'Internal Server Error'});
  }
})

router.get('/:taste', async (req,res)=>{
  try{
   const taste = req.params.taste;//extract work type from URL parameter
   if(taste =='spicy'|| taste == 'sweet' || taste == 'sour'){
       const response = await MenuItem.find({taste: taste});
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
    const menuItemID =req.params.id;//Extract the id from the URL parameter
    const updatedmenuItemData = req.body;//updated data for the person

    const response = await MenuItem.findByIdAndUpdate(menuItemID,updatedmenuItemData,{
      new: true,//Return the updated document
      runValidators: true,//Run Mongoose validation.validater there in person.js
    })

    if(!response){//this condition will execute when you give the wrong ID
      return res.status(404).json({error: 'menuItem not found'});
    }

    console.log('data updated');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }

//Its for delete the data
router.delete("/:id", async (req, res) => {
  try{
    const menuItemID = req.params.id;//Extract the id from the URL parameter
    
    //Assuming you have a Person model
    const response = await MenuItem.findByIdAndDelete(menuItemID);

    if (!response) {//this condition will execute when you give the wrong ID
      return res.status(404).json({ error: "MenuItem not found" });
    }

    console.log("data deleted");
    res.status(200).json({ message: "MenuItem Deleted Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
    }
  });

})


module.exports = router;