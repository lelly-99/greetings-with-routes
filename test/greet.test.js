import assert from "assert";
import greet from "../factory-function/greetFunction.js";

describe ("greet user", function (){
    it('should  be able to greet user in english"', function(){
        var greetingOne = greet();

        greetingOne.setName('lelly')
        greetingOne.setLanguage("english")

        assert.equal("Hi Lelly", greetingOne.greetUser("lelly", "english"))
    })
    it('should  be able to greet user in afrikaans"', function(){
        var greetingOne = greet();

        greetingOne.setName('lelly')
        greetingOne.setLanguage("afrikaans")

        assert.equal("Hallo Lelly", greetingOne.greetUser("lelly", "afrikaans"))
    })
    it('should  be able to greet user in xhosa"', function(){
        var greetingOne = greet();

        greetingOne.setName('lelly')
        greetingOne.setLanguage("xhosa")

        assert.equal("Molo Lelly", greetingOne.greetUser("lelly", "xhosa"))
    })
    
})
describe ("case sensitivity", function (){
    it('should  be able to capitalize first letter of user name"', function(){
        var greetingOne = greet();

        greetingOne.setName('lelLy')
        greetingOne.setLanguage("xhosa")

        assert.equal("Molo Lelly", greetingOne.greetUser("lelLy", "xhosa"))
    })
    it('should  be able to lower cases of letters after after first letter"', function(){
        var greetingOne = greet();

        greetingOne.setName('lelLy')
        greetingOne.setLanguage("xhosa")

        assert.equal("Molo Lelly", greetingOne.greetUser("lelLy", "xhosa"))
    })
})
describe ("error message", function (){
    it('should  be able to return error message for when name is  not entered and radio input is not selected"', function(){
        var errorOne = greet();

        errorOne.setName('')
        errorOne.setLanguage("")

        assert.equal("Enter a valid name and select a language", errorOne.errorMessage())
    })
    it('should  be able to return error message when name is not entered"', function(){
        var greetingOne = greet();

        greetingOne.setName('')
        greetingOne.setLanguage("xhosa")

        assert.equal("Enter a valid name", greetingOne.errorMessage())
    })
    it('should  be able to return error message for name"', function(){
        var greetingOne = greet();

        greetingOne.setName('lelly')
        greetingOne.setLanguage("")

        assert.equal("Select a language", greetingOne.errorMessage())
    })

})
describe ("Validity", function (){
    it('should  be able to return error message when user enters numbers"', function(){
        var errorOne = greet();

        errorOne.setName('544')
        errorOne.setLanguage("")

        assert.equal("Enter a valid name and select a language", errorOne.errorMessage())
    })
    it('should  be able to return error message when user enters characters"', function(){
        var errorOne = greet();

        errorOne.setName('$%#$*&')
        errorOne.setLanguage("")

        assert.equal("Enter a valid name and select a language", errorOne.errorMessage())
    })
    it('should  be able to return error message for name with numers and characters"', function(){
        var greetingOne = greet();

        greetingOne.setName('lely@65')
        greetingOne.setLanguage("xhosa")

        assert.equal("Enter a valid name", greetingOne.errorMessage())
    })
})
describe("counter", function() {
    it('should be able to count number of people greeted "3" for 3 different names name', function() {
      var countOne = greet();
  
      
      countOne.addName("lelly");
      countOne.addName("lethabo");
      countOne.addName("letago");

  
      assert.equal(3, countOne.getCounter());
    });

    it('should be able return 1 if same user is greeted twice or more', function() {
        var countOne = greet();
    
        
        countOne.addName("lelly");
        countOne.addName("lelly");
        countOne.addName("lelly");
        countOne.addName("lelly");
    
        assert.equal(1, countOne.getCounter());
      });

    //   it('should  be able to return 1 for same name with different cases"', function(){
    //     var greetingOne = greet();

    //     greetingOne.setName('lelLy')
    //     greetingOne.setName('lelLy')
    //     greetingOne.setName('lelLy')
    //     greetingOne.setName('lelLy')
        

    //     assert.equal(1, greetingOne.addName())
    // })
  });
describe ("reset counter", function(){
    it('should  be able to reset the counter to zero', function(){
        var countOne = greet();

        countOne.setName('lelly')
        countOne.setLanguage("xhosa")
        countOne.greetUser("lelly", "xhosa")
        countOne.getCounter()

        assert.equal(0 , countOne.resetCounter() )
    })
})
