/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as SC from './UploadPhoto.sc';
import { isValidFileType, calculateFileSize } from '../../shared/utility/utility';
import Button from '../UI/Button/Button';
import FlexWrapper from '../UI/FlexWrapper';
import PlainText from '../UI/PlainText';
import theme from '../../styled/theme';

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
    setPhotoName(file.name);
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
  let preview = (
    <PlainText size="2" mgTop="2">
      {defaultPreviewText}
    </PlainText>
  );
  let deleteThisBtn = null;
  let deleteCurrentBtn = null;
  let errorNode = null;

  if (error) {
    errorNode = (
      <PlainText size="1" mgTop="2" color={theme.colors.red}>
        {error}
      </PlainText>
    );
  }

  if (photo || error) {
    preview = (
      <FlexWrapper mgTop="2" spacing="3">
        <PlainText
          size="1"
          maxWidth="75%"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          Name: {photoName}
        </PlainText>
        <PlainText size="1">Size: {photoSize}</PlainText>
      </FlexWrapper>
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
    <SC.Wrapper>
      <FlexWrapper spacing="3">
        <label htmlFor="photo" className="label">
          <Button filled>Upload photo</Button>
        </label>
        {deleteThisBtn}
        {deleteCurrentBtn}
      </FlexWrapper>
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
