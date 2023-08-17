export default function greet() {
  var counter = 0;
  var userLanguage = "";
  var userNames = [];
  var userName = "";
  var greet = "";
  var error = "";
  var userCount = 0;

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

  function getCounterForUser() {
    return userCount;
  }

  function getNames() {
    return userNames.map(user => user.name);
  }

  function addNameForUser(name) {
    for (let i = 0; i < userNames.length; i++) {
      if (userNames[i].name === setName(name)) {
        userNames[i].greetCount++;
        return userNames[i].greetCount;
      }
    }
    return 0; 
  }
  
  function addName(name) {
    const userName = setName(name);
    let isNewUser = true;
    for (let i = 0; i < userNames.length; i++) {
      if (userNames[i].name === userName) {
        isNewUser = false;
        break;
      }
    }
    if (isNewUser) {
      userNames.push({ name: userName, greetCount: 0 });
    }
    return counter++;
  }

  function greetUser() {
    if (userLanguage !== "" && userName.match(/^[A-Za-z]+$/)) {
       addNameForUser(userName);
      if (userLanguage === "english") {
        greet = "Hi " + userName;
      } else if (userLanguage === "afrikaans") {
        greet = "Hallo " + userName;
      } else if (userLanguage === "xhosa") {
        greet = "Molo " + userName;
      }
    
    } else if (!getNames().includes(userName) && userLanguage !== "" && userName.match(/^[A-Za-z]+$/)) {
      addName(userName);
      if (userLanguage === "english") {
        greet = "Hi " + userName;
      } else if (userLanguage === "afrikaans") {
        greet = "Hallo " + userName;
      } else if (userLanguage === "xhosa") {
        greet = "Molo " + userName;
      }
    }
    return greet;
  }
  
  function errorMessage() {
    if (!userName.match(/^[A-Za-z]+$/) && userLanguage === "") {
      error = "Enter a valid name and select a language";
    } else if (userLanguage === "") {
      error = "Select a language";
    } else if (!userName.match(/^[A-Za-z]+$/)) {
      error = "Enter a valid name";
    }
    return error;
  }

  function reset() {
    counter = 0;
    userNames = [];
    userLanguage = "";
    userName = "";
    greet = "";
  }

  function getUserGreetCount(userName) {
    for (let i = 0; i < userNames.length; i++) {
      if (userNames[i].name === userName) {
        return userNames[i].greetCount;
      }
    }
    return 0;
  }
  
  function nameExists(name) {
    const formattedName = setName(name);
  
    for (let i = 0; i < userNames.length; i++) {
      if (userNames[i].name === formattedName) {
        return true;
      }
    }
  
    return false;
  }

  return {
    greetUser,
    getCounter,
    getNames,
    setName,
    setLanguage,
    reset,
    errorMessage,
    addName,
    getUserGreetCount,
    addNameForUser,
    getCounterForUser,
    nameExists,
  };
}
