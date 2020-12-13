/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as SC from './UploadPhoto.sc';
import { isValidFileType, calculateFileSize } from '../../shared/utility';
import Button from '../UI/Button/Button';
import HorizontalWrapper from '../UI/HorizontalWrapper';

const PRODUCT_PHOTO_MAX_SIZE = 6291456;
const PRODUCT_PHOTO_MAX_SIZE_STRING = calculateFileSize(PRODUCT_PHOTO_MAX_SIZE);

const UploadPhoto = (props) => {
  const { setFieldValue, hasCurrentPhoto } = props;

  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [photoSize, setPhotoSize] = useState('');
  const [error, setError] = useState('');
  const [isCurrentPhotoDeleted, setIsCurrentPhotoDeleted] = useState(!hasCurrentPhoto);

  const resetState = () => {
    setPhoto(null);
    setFieldValue('photo', null);
    setPhotoName('');
    setPhotoSize('');
    setError('');
  };

  const deleteCurrentPhotoHandle = () => {
    setIsCurrentPhotoDeleted(true);
    setFieldValue('photo', 'DELETED');
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
      setIsCurrentPhotoDeleted(true);
      setFieldValue('photo', file);
    };
  };

  const defaultPreviewText = `Photo is optional. Max size is ${PRODUCT_PHOTO_MAX_SIZE_STRING}. Available extensions are JPG and PNG`;
  let preview = <SC.Preview>{defaultPreviewText}</SC.Preview>;
  let deleteThisBtn = null;
  let deleteCurrentBtn = null;
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
    deleteThisBtn = (
      <Button color="red" clicked={resetState}>
        Delete
      </Button>
    );
  }

  if (!isCurrentPhotoDeleted) {
    deleteCurrentBtn = (
      <Button color="red" clicked={deleteCurrentPhotoHandle}>
        Delete current
      </Button>
    );
  }

  return (
    <SC.Wrapper className="content">
      <HorizontalWrapper justify="left">
        <label htmlFor="photo" className="label">
          <Button filled>Upload photo</Button>
        </label>
        {deleteThisBtn}
        {deleteCurrentBtn}
      </HorizontalWrapper>
      {preview}
      {errorNode}
      <input type="file" id="photo" name="photo" className="input" onChange={inputChangedHandler} />
    </SC.Wrapper>
  );
};

UploadPhoto.defaultProps = {
  hasCurrentPhoto: false,
};

UploadPhoto.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  hasCurrentPhoto: PropTypes.bool,
};

export default UploadPhoto;
