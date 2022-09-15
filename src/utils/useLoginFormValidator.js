import { useState } from "react";

import {
  emailValidator,
  nameValidator
} from "./validators.js";

//Loops through object and sets 'dirty' property of each error object to true
//Used to force validation on all fields on attempted form submission
const touchErrors = (errors) => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

//Receives a form state as an argument
export const useLoginFormValidator = form => {
  const [errors, setErrors] = useState({
    contactName: {
      dirty: false,
      error: false,
      message: "",
    },
    contactEmail: {
      dirty: false,
      error: false,
      message: "",
    },
  });

  //form - the form state
  //field - the name of the form field that should be validated
  //errors - the errors object
  //forceTouchErrors - boolean flag indicating whether all fields should be set to dirty to force validation
  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    //Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    //Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { contactName, contactEmail } = form;

    if (nextErrors.contactEmail.dirty && (field ? field === "contactEmail" : true)) {
      const emailMessage = emailValidator(contactEmail, form);
      nextErrors.contactEmail.error = !!emailMessage;
      nextErrors.contactEmail.message = emailMessage;
      if (!!emailMessage) isValid = false;
    }

    if (nextErrors.contactName.dirty && (field ? field === "contactName" : true)) {
      const nameMessage = nameValidator(contactName, form);
      nextErrors.contactName.error = !!nameMessage;
      nextErrors.contactName.message = nameMessage;
      if (!!nameMessage) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  }

  //checks if field that was blurred is already 'dirty'
  //if it was not, updates the errors object accordingly to set trigger field validation
  const onBlurField = e => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError?.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  //return object with these properties
  return {
    validateForm,
    onBlurField,
    errors,
  };
};