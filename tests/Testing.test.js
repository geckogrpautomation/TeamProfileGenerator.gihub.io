const obj = require("../objClass");

describe("Manager class", () => {
    it("Returns Manager contact details", () => {
        let emp = new obj.Manager("Lachlan Cameron", 12345, "lachlan@email.com", "Chris Maxwell",95555555,"Manager");
        
        //Check members
        expect(emp.fullName).toBe("Lachlan Cameron");
        expect(emp.id).toBe(12345);
        expect(emp.email).toBe("lachlan@email.com");        
        expect(emp.reportTo).toBe("Chris Maxwell");
        expect(emp.officePhone).toBe(95555555);
        expect(emp.className).toBe("Manager");

        //Check methods
        expect(emp.get_Name()).toBe("Lachlan Cameron");
        expect(emp.get_ID()).toBe(12345);
        expect(emp.get_Email()).toBe("lachlan@email.com");        
        expect(emp.get_LineMang()).toBe("Chris Maxwell");
     });
});


describe("Engineer class", () => {
  it("Returns Engineer contact details", () => {
      let emp = new obj.Engineer("Lachlan Cameron", 12345, "lachlan@email.com", "Chris Maxwell","geckogrpautomation","Engineer");
      
      //Check members
      expect(emp.fullName).toBe("Lachlan Cameron");
      expect(emp.id).toBe(12345);
      expect(emp.email).toBe("lachlan@email.com");        
      expect(emp.reportTo).toBe("Chris Maxwell");
      expect(emp.gitHub).toBe("geckogrpautomation");
      expect(emp.className).toBe("Engineer");

      //Check methods
      expect(emp.get_Name()).toBe("Lachlan Cameron");
      expect(emp.get_ID()).toBe(12345);
      expect(emp.get_Email()).toBe("lachlan@email.com");        
      expect(emp.get_LineMang()).toBe("Chris Maxwell");
   });
});

describe("Intern class", () => {
  it("Returns Intern contact details", () => {
      let emp = new obj.Intern("Lachlan Cameron", 12345, "lachlan@email.com", "Chris Maxwell","Brighton Grammar","Intern");
      
      //Check members
      expect(emp.fullName).toBe("Lachlan Cameron");
      expect(emp.id).toBe(12345);
      expect(emp.email).toBe("lachlan@email.com");        
      expect(emp.reportTo).toBe("Chris Maxwell");
      expect(emp.school).toBe("Brighton Grammar");
      expect(emp.className).toBe("Intern");


      //Check methods
      expect(emp.get_Name()).toBe("Lachlan Cameron");
      expect(emp.get_ID()).toBe(12345);
      expect(emp.get_Email()).toBe("lachlan@email.com");        
      expect(emp.get_LineMang()).toBe("Chris Maxwell");
   });
});

  