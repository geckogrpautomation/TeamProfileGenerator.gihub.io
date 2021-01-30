const inquirer = require("inquirer");
const fs = require("fs");
const jest = require("jest");
const obj = require("./objClass");
const { Console } = require("console");

//Define class storage containers to store class data
var mangClassContainer = [];
var engClassContainer = [];
var intClassContainer = [];
var pkgClassContainer = [];

//Count how many time inquirer has run
let inqCount = 0;

//Define inquirer choices constant
const inqChoices = ["Engineer","Intern","Exit"];

//Define Inquirer questions
const manQuestions = [  
  {name: "name", type: "input", message:"What is your name?"},
  {name: "id", type: "number", message:"What is your employee ID?(number)"},
  {name: "email", type: "input", message:"What is your email address?"},
  {name: "offNum", type: "number", message:"What is your office number?(number)"},
  {name: "add", type: "rawlist", message:"Do you want to add another staff member?", choices: inqChoices, default:"Exit"}
];

const engQuestions = [  
  {name: "name", type: "input", message:"What is your name?", },
  {name: "id", type: "number", message:"What is your employee ID?(number)"},
  {name: "email", type: "input", message:" What is your email address?"},
  {name: "gitHub", type: "input", message:"What is your gitHub?"}, 
  {name: "reportTo", type: "input", message:"Whom does this staff member report to?"},
  {name: "add", type: "rawlist", message:"Do you want to add another staff member?", choices: inqChoices ,default:"Exit"},     
];


const internQuestions = [  
  {name: "name", type: "input", message:"What is your name?"},
  {name: "id", type: "number", message:"What is your employee ID?(number)"},
  {name: "email", type: "input", message:" What is your email address?"},
  {name: "reportTo", type: "input", message:"Whom does this staff member report to?"},
  {name: "add", type: "rawlist", message:"Do you want to add another staff member?", choices: inqChoices ,default:"Exit"},    
];

//Inquirer function
function runInquirer(inputObject){

  inqCount++; 

  inquirer

    .prompt(inputObject)

    .then( a => {      
      
     inqAns(a);

  });
}
//End function runInquirer()


//Decide what data to store and where. Decide to call inquirer again or not.
function inqAns(a){

  //Store data
  if (a.offNum  !== undefined){

    storeM(a);

  }
      
  if (a.gitHub  !== undefined){

    storeE(a);

  }

  if (a.school !== undefined){

    storeI(a);

  }
  
  //Re-run Inquirer if the suer has selected to add an engineer or Intern
  if (a.add === "Engineer"){

    runInquirer(engQuestions);
  }

  if (a.add === "Intern"){

    runInquirer(internQuestions);
  }
 
  }
//End function inqAns()


//Store Manager data
function storeM(a){
  
  let tempClass = new obj.Manager(a.name,a.id,a.email,a.offNum,"Manager");  

  mangClassContainer.push([tempClass]); 
  
  log(mangClassContainer)

  if (a.add === "Exit"){

    pkgData()

  }
}
//End function storeM()


//Store Engineer data
function storeE(a){
 
  let tempClass = new obj.Engineer(a.name,a.id,a.email,a.offNum,"Engineer");

  engClassContainer.push([tempClass]); 

  log(engClassContainer) 

  if (a.add === "Exit"){

    pkgData()

  }
}
//End function storeE()


//Store Intern data
function storeI(a){

  let tempClass = new obj.Intern(a.name,a.id,a.email,a.offNum,"Intern");

  intClassContainer.push([tempClass]); 

  log(intClassContainer) 

  if (a.add === "Exit"){
    pkgData()
  }
}
//End function storeI()


//Log to JSON file in class structure with class data
function log(d){

dp = JSON.stringify (d);

  fs.appendFile("./errLog.JSON",`\n${dp}`, (err) => { 
    if (err) 
      throw err 
  }); 

}


//pkGData to to ready for HTML generation
function pkgData(){
  
  pkgClassContainer.push([mangClassContainer]); 

  pkgClassContainer.push([engClassContainer]); 

  pkgClassContainer.push([intClassContainer]); 
  
  let d = JSON.stringify (pkgClassContainer);

  //Log data to files to store user data retentively.
  fs.appendFile("./pkgLog.JSON",`\n${d}`, (err) => { 
    if (err) 
      throw err 
  });
}
//End function pkgData()


//Build HTML from pkgLog.JSON
buildOrgObject(){
 
}
//End function buildHTMl()


//Call Inquirer for the first time when called from the commadn line.
runInquirer(manQuestions);


 
  