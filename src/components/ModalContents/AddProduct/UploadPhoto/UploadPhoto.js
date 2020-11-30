/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as SC from './UploadPhoto.sc';
import { isValidFileType, calculateFileSize } from '../../../../shared/utility';
import Button from '../../../UI/Button/Button';

const PRODUCT_PHOTO_MAX_SIZE = 6291456;
const PRODUCT_PHOTO_MAX_SIZE_STRING = calculateFileSize(PRODUCT_PHOTO_MAX_SIZE);

const UploadPhoto = (props) => {
  const { setFieldValue } = props;

  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [photoSize, setPhotoSize] = useState('');
  const [error, setError] = useState('');

  const resetState = () => {
    setPhoto(null);
    setFieldValue('photo', null);
    setPhotoName('');
    setPhotoSize('');
    setError('');
  };

  const inputChangedHandler = async (e) => {
    const { files } = e.target;
    if (!files.length > 0) {
      resetState();
      return;
    }

    const file = files[0];
    let fileName = file.name;
    if (fileName.length > 30) {
      fileName = `${fileName.slice(0, 25)}...${file.type.split('/')[1]}`;
    }
    setPhotoName(fileName);
    setPhotoSize(calculateFileSize(file.size));

    if (!isValidFileType(file.type)) {
      setPhoto(null);
      setFieldValue('photo', null);
      setError('File extension is not valid (JPG and PNG only)');
      return;
    }
    setError(null);

    if (file.size > PRODUCT_PHOTO_MAX_SIZE) {
      setError(`Maximum available size is ${PRODUCT_PHOTO_MAX_SIZE_STRING}`);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(file);
      setFieldValue('photo', file);
    };
  };

  const defaultPreviewText = `Photo is optional. Max size is ${PRODUCT_PHOTO_MAX_SIZE_STRING}. Available extensions are JPG and PNG`;
  let preview = <SC.Preview>{defaultPreviewText}</SC.Preview>;
  let deleteBtn = null;
  let errorNode = null;

  if (error) {
    errorNode = <span className="error">{error}</span>;
  }

  if (photo || error) {
    preview = (
      <SC.Preview>
        <span className="file-data">Name: {photoName}</span>
        <span className="file-data">Size: {photoSize}</span>
      </SC.Preview>
    );

    deleteBtn = <Button clicked={resetState}>Delete</Button>;
  }

  return (
    <SC.Wrapper className="content">
      <div className="buttons">
        <label htmlFor="photo" className="label">
          <Button filled>Upload photo</Button>
        </label>
        {deleteBtn}
      </div>
      {preview}
      {errorNode}
      <input type="file" id="photo" name="photo" className="input" onChange={inputChangedHandler} />
    </SC.Wrapper>
  );
};

UploadPhoto.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
};

export default UploadPhoto;
