//callback() function

//const { json } = require("express");

//  function callback(){//this is a call back function
//     console.log('now adding is successful complete');
//  }
//here we used main function inside the callback function
//  const add = function(a,b,callback){//this is a main function
//    var result = a+b;
//    console.log('result:' +result);
//    callback();
//  }
//  add(2,3,callback);
//   OR
 //add(2,3,()=>console.log('add completed'));//here we write the callback function in inline . 
 //we call the callback() when the main function work is completed after that we call the callback function.
 //A function which call inside the another function are known as callback function
  
 
//  var fs = require('fs');//fs module  in node js
//  var os = require('os');//os module  in node js

//  var user = os.userInfo();
//  console.log(user);
//  console.log(user.username);

//  fs.appendFile('greet.txt','Hii'+ user.username + '!\n', ()=>{
//     console.log('file is created');
//  });

// console.log(os);//here we check os kya kya kar sakta hai, they print all the things which os can be do.
// console.log(fs);//here we check fs kya kya kar sakta hai, they print all the things which fs can be do.

// const notes = require('./notes.js');//here we import file form the notes.js by using this given syntax

// //these syntax we used when export file from another file.
// var age = notes.age;
// var result = notes.addNumber(age+18,10);
// console.log(age);
// console.log('result is now:' +result);

//Now use of lodash package in nodejs

// var _ = require('lodash');//by using this lodash function we find unique element form the arr.

// var data = ["person","person",1,2,1,2,'name','age','2'];
// var filter = _.uniq(data);
// console.log(filter);

// console.log(_.isString('ab'));//they check the data if data is string return true otherwise return false.

//JSON is that which convert the data in structured format in well manner.
// const objectToConvert ={
//   name: "Alice",
//   age: 25
// };
// const json = JSON.stringify(objectToConvert);//by using we can convert any  object to JSON string
// console.log(json);

// console.log(typeof json);//type of json is string

const express = require('express')//this line tell that we need a exprees.
const app = express();//here we store the express function in app.

//get method data de sakta hai kuch le nahi skta,data lene ke liye post method ka use karte hai
//get method is that they just want information,only read the information don't change anything.ex read book in library.After address / enter means data milega 
app.get('/', function (req, res){//function have two parameter req and res.
  res.send('Welcome to my hotel... How i can help you?')//function send res.here
})
app.get('/Paneer',function (req, res){//its API is localhost3000/Paneer
  res.send('sure sir, i would love to serve Paneer')
})
app.get('/idli',function (req, res){//Its API is localhost3000/idli
  var customized_idli = {//Here we give list of item to the server.These result shown by JSON in server.These like a menu card in hotel.Request uski he laga jiska server ke pass respons hoga. 
    name:'rava idli',
    size:'10 cm diameter',
    is_sambhar:true,
    is_chutney:false,
  }
  res.send(customized_idli)
})

app.listen(1000,()=>{//this is the location of the server
  console.log('listening on port 1000');
})

//we store database in json format because they are light weight and easy to read and write.
//db.users.find().forEach(doc => print(JSON.stringify(doc))) //this is the command to convert the data in json format in mongodb