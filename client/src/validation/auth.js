export const validateSignin = (formData) => {
  const errors = {};

  if (!formData.email) {
    errors.email = "Email is required.";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  }

  return errors;
};

export const validateSignup = (formData) => {
  const errors = {};

  if (!formData.firstName) {
    errors.firstName = "First Name is required.";
  }

  if (!formData.lastName) {
    errors.lastName = "Last Name is required.";
  }

  if (!formData.email) {
    errors.email = "Email is required.";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};
