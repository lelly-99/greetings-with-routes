export default function greet() {
    var counter = 0;
    var userLanguage = '';
    var userNames = [];
    var userName = '';
    var greet = '';
    var error = '';  
  
    function setName(name) {
      userName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      return userName;
    }
  
    function setLanguage(language) {
      userLanguage = language;
      return userLanguage;
    }
  
    function getCounter() {
      return counter;
    }
  
    function getNames() {
      return userNames;
    }
  
    function addName(name) {
      var userName = setName(name);
      if (!userNames.includes(userName)) {
        userNames.push(userName);
        counter = userNames.length;
      }
      return counter
    }
  
    function greetUser() {
      userName = setName(userName);
  
      if (userLanguage !== '' && userName.match(/^[A-Za-z]+$/) && !getNames().includes(userName)) {
        addName(userName);
        if (userLanguage === 'english') {
          greet = 'Hi ' + userName;
        } else if (userLanguage === 'afrikaans') {
          greet = 'Hallo ' + userName;
        } else if (userLanguage === 'xhosa') {
          greet = 'Molo ' + userName;
        } 
      }
      return greet;
    }

    function errorMessage() {
     if (!userName.match(/^[A-Za-z]+$/) && userLanguage === '') {
        error = 'Enter a valid name and select a language';
      } else if (userLanguage === '') {
        error = 'Select a language';
      } else if (!userName.match(/^[A-Za-z]+$/)) {
        error = 'Enter a valid name';
      }
      return error;
    }
  
    function resetCounter() {
      counter = 0;
      return counter;
    }
  
    return {
      greetUser,
      getCounter,
      getNames,
      setName,
      setLanguage,
      resetCounter,
      errorMessage,
      addName,
    };
  }
  

