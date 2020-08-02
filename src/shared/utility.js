export const updateObject = (oldObject, updatedProps) => ({
  ...oldObject,
  ...updatedProps,
});

export const getErrorMessage = (error) => {
  let errorMessage = 'Something went wrong';
  if (error.response.data.errors) {
    errorMessage = Object.values(error.response.data.errors)[0].properties.message;
  }
  if (error.response.data.message) {
    errorMessage = error.response.data.message;
  }
  return errorMessage;
};