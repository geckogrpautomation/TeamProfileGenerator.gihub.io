const inquirer = require("inquirer");
const fs = require("fs");
const obj = require("./objClass");
const path = require('path');

//Define file paths
let pkgPath = path.join(__dirname, "/pkgLog.JSON");
let orgPath = path.join(__dirname, "/orgChart.JSON");


//Define class storage containers to store class data
var mangClassContainer = [];
var engClassContainer = [];
var intClassContainer = [];
var pkgClassContainer = [];
var orgChartAdd = [];
var orgChartExist = [];

console.log("intClassContainer length " + intClassContainer.length);

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


//pkGData. Consolidate arrays ready for bulk Org object creation
function pkgData(){
  
  if (mangClassContainer.length > 0){

    pkgClassContainer.push(mangClassContainer);
   
  }
   
  if (engClassContainer.length > 0){

    pkgClassContainer.push(engClassContainer); 

  }

  if (intClassContainer.length > 0){
    console.log("empty intClass  -  " + intClassContainer);

    pkgClassContainer.push(intClassContainer); 

  }

  let d = JSON.stringify(pkgClassContainer);

  
  fs.appendFile(pkgPath,`${d}`, (err) => {  //Log data to files to store user data retentively.
    if (err) 
      throw err 
  });
  buildOrgObject(d);
    
} //End function pkgData()



//Build Org JSON object
function buildOrgObject(d){

  let dp = JSON.parse(d);
  let x = [];
  let y = [];
  
  dp.forEach(e1 => {  

    console.log("buildOrgObject inside dp.foreach " + JSON.stringify(e1))
    
    x = slctOrgString(e1);

    orgChartAdd.push(x);
  
  });  //Render Org chart objects


fs.readFile(orgPath, (err, data) => { //Read back existing Org chart store.

  if (err){ //If file isnt in the directory write only the contents added in the cmd session    
    fs.writeFile(orgPath,JSON.stringify(orgChartAdd), (err) => { 
      if (err) 
        throw err 
    });
  } 
     
  else { //If file is in the directory add existing file data and new cmd session data together and write to directory
    orgChartExist = JSON.parse(data); //Add to existing Org chart array. 

    orgChartAdd.forEach(e2 => {    
      orgChartExist.push(e2);   
    }); 

   
  fs.unlink(orgPath, (err => {  //Delete file and write back Org chart data
    if (err) { 
      console.log(err); 
    }    
    else{ //If no delete file error then write the file back with add and existing datae      
      fs.writeFile(orgPath,JSON.stringify(orgChartExist), (err) => {  //Start write file
        if (err)
          throw err 
      }); //End write file
    } //End else 
  })); //End file delete and write
  } //End else  
  }); //End Read back existing Org chart store.  
}//End function buildOrgObject()



function slctOrgString(e){
  

  if (e[0].className === "Manager") {

   return [{'v': `${e[0].fullName}`, 'f': `<div style="color:black; font-style:bold;width: auto; text-align: left; padding: 10px;">${e[0].fullName}'<br>${e[0].className}<br>${e[0].id}<br><a href="mailto:${e[0].email}">Email</a><br><a href="tel:${e[0].offNum}">Phone</a></div>`},`${e[0].reportTo}`, 'Manager'];

  }   
  
  if (e[0].className === "Engineer") {

    return [{'v': `${e[0].fullName}`, 'f': `<div style="color:black; font-style:bold;width: auto; text-align: left; padding: 10px;">${e[0].fullName}<br>${e[0].className}<br>${e[0].id}<br><a href="mailto:${e[0].email}">Email</a><br><a href="tel:${e[0].gitHub}">GitHub</a></div>`},`${e[0].reportTo}`, 'Engineer'];

  }   

  if (e[0].className === "Intern") {

    return [{'v': `${e[0].fullName}`, 'f': `<div style="color:black; font-style:bold;width: auto; text-align: left; padding: 10px;">${e[0].fullName}<br>${e[0].className}<br>${e[0].id}<br><a href="mailto:${e[0].email}">Email</a><br>${e[0].school}</div>'`},`${e[0].reportTo}`, 'Intern'];

  }   
 
}
//End function slctOrgString()
     

//Call Inquirer for the first time when called from the command line.
runInquirer(manQuestions);


 
  