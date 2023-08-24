export default function greet() {
  var counter = 0;
  var userLanguage = "";
  var userNames = [];
  var userName = "";
  var greet = "";

  function setName(name) {
    userName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return userName;
  }

  function setLanguage(language) {
    userLanguage = language;
    return userLanguage;
  }

  function getNames() {
    return userNames.map(user => user.name);
  }

  function greetUser() {
    if (userLanguage !== "" && userName.match(/^[A-Za-z]+$/)) {
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
  
  //return instead of reassigning the error to error message
  function errorMessage(userName, userLanguage) {
    if (!userName.match(/^[A-Za-z]+$/) && !userLanguage) {
      return "Enter a valid name and select a language";
    } else if (!userName.match(/^[A-Za-z]+$/)) {
      return "Enter a valid name";
    } else if (!userLanguage) {
      return "Select a language";
    }
  }
  
  function reset() {
    counter = 0;
    userNames = [];
    userLanguage = "";
    userName = "";
    greet = "";
  }
  
  return {
    greetUser,
    getNames,
    setName,
    setLanguage,
    reset,
    errorMessage,
  };
}
