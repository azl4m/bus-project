function capitalizeFirstLetter(str) {
    if (!str) return '';
    str = str.trim().toLowerCase(); // Remove leading/trailing whitespace
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  console.log(capitalizeFirstLetter(" hello")); // Output: "Hello"
  module.exports={
    capitalizeFirstLetter
  }