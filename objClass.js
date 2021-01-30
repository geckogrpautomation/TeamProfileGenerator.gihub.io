
//<-------------------------------------------CLASSES------------------------------------------->

//Create Employee class. Base Class
class Employee{

    constructor(fName,id,email,reportTo) {
    
        this.fullName = fName;
        this.id = id;
        this.email = email;
        this.reportTo = reportTo
    
    }

    getName(){

        return this.fullName; 
           
    }

    getID(){ 

        return this.id;
    }


    get_Email(){

        return this.email;
            
    }

    get_Role(){

        return this.className; 

    }

    get_LineMang(){

        return this.reportTo;

    }
    
}

  
 
//Extend employee class to manager via the below. Extended class of Employee
class Manager extends Employee {
    constructor(fName,id,email,reportTo,offPhone,className){
    super(fName,id,email,reportTo);
    this.officePhone = offPhone;
    this.className = className;  
    
    }
}


//Extend employee class to engineer via the below:
class Engineer extends Employee{

    constructor(fName,id,email,reportTo,gitHub,className) {
    
        super(fName,id,email,reportTo);
        this.gitHub = gitHub;
        this.className = className;  
         
    }

    getGithub(){

        return this.gitHub;

    }
}


//Extend employee class to intern via the below:
class Intern extends Employee{
    
    constructor(fName,id,email,reportTo,school,className){
    
        super(fName,id,email,reportTo); 
        this.school = school;
        this.className = className;        
    
    }

    getSchool(){

        return this.school;

    }
}


module.exports = {
    
  Manager,
  Engineer,
  Intern     

}

