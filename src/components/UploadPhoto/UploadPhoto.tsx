import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as SC from './UploadPhoto.sc';
import { isValidFileType, calculateFileSize } from '../../shared/utility/utility';
import Button from '../UI/Button/Button';
import FlexWrapper from '../UI/FlexWrapper';
import PlainText from '../UI/PlainText';
import theme from '../../styled/theme';
import { ProductPhotoFieldValue } from '../../shared/types/enums';

const PRODUCT_PHOTO_MAX_SIZE = 6291456;
const PRODUCT_PHOTO_MAX_SIZE_STRING = calculateFileSize(PRODUCT_PHOTO_MAX_SIZE);

interface UploadPhotoProps {
  setFieldValue: (fieldName: string, value: ProductPhotoFieldValue | File | null) => void;
  hasCurrentPhoto?: boolean;
}

export default function UploadPhoto({ setFieldValue, hasCurrentPhoto }: UploadPhotoProps) {
  const input = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoName, setPhotoName] = useState<string>('');
  const [photoSize, setPhotoSize] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isCurrentPhotoDeleted, setIsCurrentPhotoDeleted] = useState<boolean>(!hasCurrentPhoto);

  const resetState = () => {
    setPhoto(null);
    setFieldValue('photo', null);
    setPhotoName('');
    setPhotoSize('');
    setError('');
    if (input.current) {
      input.current.value = '';
    }
  };

  const deleteCurrentPhotoHandle = () => {
    setIsCurrentPhotoDeleted(true);
    resetState();
    setFieldValue('photo', ProductPhotoFieldValue.DELETED);
  };

  const inputChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!target.files || !target.files.length) {
      return;
    }

    const file = target.files[0];
    setPhotoName(file.name);
    setPhotoSize(calculateFileSize(file.size));

    if (!isValidFileType(file.type)) {
      setPhoto(null);
      setFieldValue('photo', ProductPhotoFieldValue.ERROR);
      setError('File extension is not valid (JPG and PNG only)');
      return;
    }

    if (file.size > PRODUCT_PHOTO_MAX_SIZE) {
      setPhoto(null);
      setFieldValue('photo', ProductPhotoFieldValue.ERROR);
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
    <PlainText $size="level2" $mgTop="level2" data-testid="UploadPhoto-default-preview">
      {defaultPreviewText}
    </PlainText>
  );
  let deleteThisBtn = null;
  let deleteCurrentBtn = null;
  let errorNode = null;

  if (error) {
    errorNode = (
      <PlainText $size="level1" $mgTop="level2" $color={theme.colors.red}>
        {error}
      </PlainText>
    );
  }

  if (photo || error) {
    preview = (
      <FlexWrapper $mgTop="level2" $spacing="level3" data-testid="UploadPhoto-preview-photo-info">
        <PlainText
          $size="level1"
          $maxWidth="75%"
          $textOverflow="ellipsis"
          $whiteSpace="nowrap"
          $overflow="hidden"
        >
          Name: {photoName}
        </PlainText>
        <PlainText $size="level1">Size: {photoSize}</PlainText>
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
      <FlexWrapper $spacing="level3">
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
