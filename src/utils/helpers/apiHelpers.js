export const validateUser = (user) => {
  const errors = {};

  if (!user.name) {
    errors.name = "Name is a required field";
  }

  if (!user.email) {
    errors.email = "Email is a required field";
  }

  if (!user.password) {
    errors.password = "Password is a required field";
  }

  const hasErrors = Object.keys(errors).length > 0;

  return { hasErrors, errors };
};
export const validateItem = (item) => {
  const errors = {};

  if (!item.name) {
    errors.name = "Name is a required field";
  }

  if (!item.quantity) {
    errors.quantity = "Quantity is a required field";
  }

  if (!item.category) {
    errors.category = "Category is a required field";
  }

  const hasErrors = Object.keys(errors).length > 0;

  return { hasErrors, errors };
};
