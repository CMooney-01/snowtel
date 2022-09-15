//check for email that follows _@_._ protocol
//regex test evaluates to true/false
//returns error string if error or empty string if field is valid
export const emailValidator = (email) => {
  if (!email) return "Email is required";
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email";
  }

  return "";
}

//Simply checks that name field is not empty
//returns error string if error or empty string if field is valid
export const nameValidator = (name) => {
  if (!name) return "Name is required";
  return "";
}