console.log('notes page loaded');//when we write somthing inside the console, that file import easily import rest file is export.

//by using this syntax we export file to another file
var age =24;
const addNumber = function (a,b){
  return a + b;
}
module.exports ={//export function
  age, 
  addNumber
}

