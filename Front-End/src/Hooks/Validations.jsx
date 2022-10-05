//  Validaiton
const validations = (value, field) => {
  let regex;
  if (field === "email") {
    regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  } else if (field === "username") {
    regex = /^(?![\s.]+$)[a-zA-Z\s.]*$/;
  } else if (field === "password") {
    regex =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  } else {
    regex = /^[0-9]{4}$/;
  }

  const result = value.match(regex);

  if (result === null) {
    return false;
  }
  return true;
};

export default validations;
