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
    const userName = setName(name);
    const user = userNames.find(user => user.name === userName);
    if (!user) {
      userNames.push({ name: userName, greetCount: 1 });
    } else {
      user.greetCount++;
    }
    userCount++;
    return userCount;
  }

  function addName(name) {
    const userName = setName(name);
    if (!userNames.some(user => user.name === userName)) {
      userNames.push({ name: userName, greetCount: 0 }); 
      counter = userNames.length;
    }
    return counter;
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
    } else if (!getNames().includes(userName) && userLanguage !== "" && userName.match(/^[A-Za-z]+$/)){
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
    return (userNames.find(user => user.name === userName) || {}).greetCount || 0;
  }

  function nameExists(name) {
    const formattedName = setName(name);
    return userNames.some(user => user.name === formattedName);
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
