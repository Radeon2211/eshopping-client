import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as SC from './UploadPhoto.sc';
import { isValidFileType, calculateFileSize } from '../../shared/utility/utility';
import Button from '../UI/Button/Button';
import FlexWrapper from '../UI/FlexWrapper';
import PlainText from '../UI/PlainText';
import theme from '../../styled/theme';
import { productPhotoFieldValues } from '../../shared/constants';

const PRODUCT_PHOTO_MAX_SIZE = 6291456;
const PRODUCT_PHOTO_MAX_SIZE_STRING = calculateFileSize(PRODUCT_PHOTO_MAX_SIZE);

export default function UploadPhoto({ setFieldValue, hasCurrentPhoto }) {
  const input = useRef(null);

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
    input.current.value = '';
  };

  const deleteCurrentPhotoHandle = () => {
    setIsCurrentPhotoDeleted(true);
    resetState();
    setFieldValue('photo', productPhotoFieldValues.DELETED);
  };

  const inputChangeHandle = (e) => {
    const { files } = e.target;
    if (!files.length > 0) {
      return;
    }

    const file = files[0];
    setPhotoName(file.name);
    setPhotoSize(calculateFileSize(file.size));

    if (!isValidFileType(file.type)) {
      setPhoto(null);
      setFieldValue('photo', productPhotoFieldValues.ERROR);
      setError('File extension is not valid (JPG and PNG only)');
      return;
    }

    if (file.size > PRODUCT_PHOTO_MAX_SIZE) {
      setPhoto(null);
      setFieldValue('photo', productPhotoFieldValues.ERROR);
      setError(`Maximum available size is ${PRODUCT_PHOTO_MAX_SIZE_STRING}`);
      return;
    }
    setError('');

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
    <PlainText $size="2" $mgTop="2" data-testid="UploadPhoto-default-preview">
      {defaultPreviewText}
    </PlainText>
  );
  let deleteThisBtn = null;
  let deleteCurrentBtn = null;
  let errorNode = null;

  if (error) {
    errorNode = (
      <PlainText $size="1" $mgTop="2" $color={theme.colors.red}>
        {error}
      </PlainText>
    );
  }

  if (photo || error) {
    preview = (
      <FlexWrapper $mgTop="2" $spacing="3" data-testid="UploadPhoto-preview-photo-info">
        <PlainText
          $size="1"
          $maxWidth="75%"
          $textOverflow="ellipsis"
          $whiteSpace="nowrap"
          $overflow="hidden"
        >
          Name: {photoName}
        </PlainText>
        <PlainText $size="1">Size: {photoSize}</PlainText>
      </FlexWrapper>
    );
    deleteThisBtn = (
      <Button $color="red" clicked={resetState}>
        Delete
      </Button>
    );
  }

  if (!isCurrentPhotoDeleted) {
    deleteCurrentBtn = (
      <Button $color="red" clicked={deleteCurrentPhotoHandle}>
        Delete current
      </Button>
    );
  }

  return (
    <SC.Wrapper>
      <FlexWrapper $spacing="3">
        <label htmlFor="photo" className="label">
          <Button $filled>Upload photo</Button>
        </label>
        {deleteThisBtn}
        {deleteCurrentBtn}
      </FlexWrapper>
      {preview}
      {errorNode}
      <input
        type="file"
        id="photo"
        name="photo"
        className="input"
        onChange={inputChangeHandle}
        data-testid="UploadPhoto-input"
        ref={input}
      />
    </SC.Wrapper>
  );
}

UploadPhoto.defaultProps = {
  hasCurrentPhoto: false,
};

UploadPhoto.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  hasCurrentPhoto: PropTypes.bool,
};
