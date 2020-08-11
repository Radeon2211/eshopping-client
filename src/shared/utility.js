// eslint-disable-next-line import/no-extraneous-dependencies
import checkPropTypes from 'check-prop-types';

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

const fileTypes = ['image/jpeg', 'image/png'];

export const isValidFileType = (type) => fileTypes.includes(type);

export const calculateFileSize = (size) => {
  if (size < 1024) {
    return `${size} bytes`;
  }
  if (size >= 1024 && size < 1048576) {
    return `${(size / 1024).toFixed(1)}KB`;
  }
  if (size >= 1048576) {
    return `${(size / 1048576).toFixed(1)}MB`;
  }
  return ``;
};

export const checkProps = (component, expectedProps) => {
  return checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
};
