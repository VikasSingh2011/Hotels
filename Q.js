// //Question 1 of the js if else condition
// var prompt = require('prompt-sync')();//when we use this condition then we have enter the age in terminal
// const age = prompt("please enter your age:");//by using this prompt the code will run properly.
// if(age<18){
//   console.log("you get a 20% discount");
// }else if(18 < age < 65){
//   console.log("Normal ticket price applies");
// }else{
//   console.log("you get a 30% senior discount!");
// }

// question 2 find the area of the rectangle
// var prompt = require('prompt-sync')();
// const length = prompt("enter the length of the rectangle:");
// const width = prompt("enter te width of the rectangle:");
// const area = length * width;
// console.log("area of the rectangle:", area);

//question 3 creating an Online Store
// const product = {
//   name : "BAT",
//   price : 2000,
//   inStock : 20
// };
// console.log(product.inStock);

// question 4 is that to checks is the given name in the list
// Create a guest list array
// const guestList = ["Anii", "Akki", "Adii", "Pys", "batuk"];

// if (guestList.includes("Pys")) {
//   console.log("Welcome to the party");
// } else {
//   console.log("Sorry, you are not in the guest list");
// }

//Q4 Ans 2
//this is the code for we take the input from the user
var prompt = require('prompt-sync')();
const guestList = ["Anii", "Akki", "Adii", "Pys", "batuk"];
const name = prompt("please enter your name:");
if(guestList.includes(name)){
  console.log("Welcome to the party");
}else{
  console.log("Sorry, you are not in the guest list");
}

// Remove-Item -Recurse -Force .git This is the command to remove the .git file from the project
// git init This command is use to initialize the git in the project
// git add . This command is use to add all the file in the staging area
// git commit -m "first commit" This command is use to commit the file in the local repository
// git branch -M main This command is use to change the branch name from master to main
// git remote add origin

//we want node_modules/ will not be tracked by git so we are create a file name .gitignore and write node_modules/ in that file
//.gitignore is ignore the node_modules directory 

