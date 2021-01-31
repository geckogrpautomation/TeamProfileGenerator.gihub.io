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
var orgChart = [];

//Count how many time inquirer has run
let inqCount = 0;

//Define inquirer choices constant
const inqChoices = ["Engineer","Intern","Exit"];

//Define Inquirer questions
const manQuestions = [  
  {name: "name", type: "input", message:"What is your name?"},
  {name: "id", type: "number", message:"What is your employee ID?(number)"},
  {name: "email", type: "input", message:"What is your email address?"},
  {name: "reportTo", type: "input", message:"Whom does this staff member report to?"},
  {name: "offNum", type: "number", message:"What is your office number?(number)"},
  {name: "add", type: "rawlist", message:"Do you want to add another staff member?", choices: inqChoices, default:"Exit"}
];

const engQuestions = [  
  {name: "name", type: "input", message:"What is your name?", },
  {name: "id", type: "number", message:"What is your employee ID?(number)"},
  {name: "email", type: "input", message:" What is your email address?"},
  {name: "reportTo", type: "input", message:"Whom does this staff member report to?"},
  {name: "gitHub", type: "input", message:"What is your gitHub?"},  
  {name: "add", type: "rawlist", message:"Do you want to add another staff member?", choices: inqChoices ,default:"Exit"},     
];


const internQuestions = [  
  {name: "name", type: "input", message:"What is your name?"},
  {name: "id", type: "number", message:"What is your employee ID?(number)"},
  {name: "email", type: "input", message:" What is your email address?"},
  {name: "reportTo", type: "input", message:"Whom does this staff member report to?"},
  {name: "school", type: "input", message:"What school did you attend?"}, 
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
  if (a.add == "Engineer"){

    runInquirer(engQuestions);
  }

  if (a.add == "Intern"){

    runInquirer(internQuestions);
  }
 
  }
//End function inqAns()


//Store Manager data
function storeM(a){
  
  let tempClass = new obj.Manager(a.name,a.id,a.email,a.reportTo,a.offNum,"Manager");  

  mangClassContainer.push(tempClass); 
  

  if (a.add == "Exit"){

    pkgData();

  }
}
//End function storeM()


//Store Engineer data
function storeE(a){
 
  let tempClass = new obj.Engineer(a.name,a.id,a.email,a.reportTo,a.gitHub,"Engineer");

  engClassContainer.push(tempClass); 

  if (a.add == "Exit"){

    pkgData();

  }
}
//End function storeE()


//Store Intern data
function storeI(a){

  let tempClass = new obj.Intern(a.name,a.id,a.email,a.reportTo,a.school,"Intern");

  intClassContainer.push(tempClass); 

  if (a.add == "Exit"){

    pkgData();
  }
}
//End function storeI()


//pkGData to to ready for HTML generation
function pkgData(){
  
  if (mangClassContainer !== []){

    pkgClassContainer.push(mangClassContainer);
   
  }
   
  if (engClassContainer !== []){

    pkgClassContainer.push(engClassContainer); 

  }

  if (intClassContainer !== []){

    pkgClassContainer.push(intClassContainer); 

  }

  let d = JSON.stringify(pkgClassContainer);

    //Log data to files to store user data retentively.
  fs.writeFile("./pkgLog.JSON",`${d}`, (err) => { 
    if (err) 
      throw err 
  });
  buildOrgObject(d);
    
}
//End function pkgData()


//Build HTML from pkgLog.JSON
function buildOrgObject(d){

  console.log("Build Org Object Ran");

  let dp = JSON.parse(d);
  
  dp.forEach(element => {  

    orgChart.push( () => { 
    
      slctOrgString(dp);
      
    });    
  
  });

}
//End function buildOrgObject()



function slctOrgString(){

  if (dp.className === "Manager") {

   return `[{'v': ${dp.name}, 'f': <div style="color:black; font-style:bold;width: auto; text-align: left; padding: 10px;">${dp.name}<br>${dp.className}<br>${dp.id}<br><a href="mailto:${dp.email}">Email</a><br><a href="tel:${a.offNum}">Phone</a></div>'},'', 'Manager']`;

  }   
  
  if (dp.className === "Engineer") {

    `[{'v': ${dp.name}, 'f': <div style="color:black; font-style:bold;width: auto; text-align: left; padding: 10px;">${dp.name}<br>${dp.className}<br>${dp.id}<br><a href="mailto:${dp.email}">Email</a><br><a href="tel:${a.gitHub}">GitHub</a></div>'},'', 'Engineer']`;

  }   

  if (dp.className === "Intern") {

    `[{'v': ${dp.name}, 'f': <div style="color:black; font-style:bold;width: auto; text-align: left; padding: 10px;">${dp.name}<br>${dp.className}<br>${dp.id}<br><a href="mailto:${dp.email}">Email</a><br><a href="tel:${a.school}">School</a></div>'},'', 'Intern']`;

  }   
 
}
//End function slctOrgString()



//Call Inquirer for the first time when called from the command line.
runInquirer(manQuestions);


 
  