export const updateObject = (oldObject, updatedProps) => ({
  ...oldObject,
  ...updatedProps,
});

export const getErrorMessage = (error) => {
  let errorMessage = 'Something went wrong';
  if (Object.values(error.response.data?.errors).length > 0) {
    errorMessage = Object.values(error.response.data.errors)[0].properties.message;
  }
  return errorMessage;
};