import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import UploadPhoto from './UploadPhoto';
import theme from '../../styled/theme';
import { mockFile } from '../../shared/utility/utility';
import { productPhotoFieldValues } from '../../shared/constants';

const setUp = (hasCurrentPhoto, setFieldValue = jest.fn()) => {
  return render(
    <ThemeProvider theme={theme}>
      <UploadPhoto setFieldValue={setFieldValue} hasCurrentPhoto={hasCurrentPhoto} />
    </ThemeProvider>,
  );
};

afterEach(cleanup);

describe('<UploadPhoto />', () => {
  const maxPossibleFileSize = 6291456;
  const tooBigFileSize = 6400000;

  describe('check how renders', () => {
    it('should render default view when hasCurrentPhoto is false', () => {
      const { asFragment } = setUp(false);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render with delete current button when hasCurrentPhoto is true', () => {
      const { asFragment } = setUp(true);
      expect(asFragment()).toMatchSnapshot();
    });

    describe('successful upload', () => {
      it('should render delete button and info when photo is uploaded', async () => {
        const photo = mockFile.create('boots.jpg', maxPossibleFileSize, 'image/jpeg');
        const setFieldValueFn = jest.fn();

        const { asFragment } = setUp(false, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo] } });
        });
        await waitFor(() => {});

        expect(asFragment()).toMatchSnapshot();
        expect(setFieldValueFn).toHaveBeenCalledWith('photo', photo);
      });

      it('should render delete button and correct info when one photo is uploaded after another', async () => {
        const photo1 = mockFile.create('photo1.jpg', maxPossibleFileSize, 'image/jpeg');
        const photo2 = mockFile.create('photo2.jpg', maxPossibleFileSize, 'image/jpeg');
        const setFieldValueFn = jest.fn();

        const { asFragment } = setUp(false, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo1] } });
        });
        await waitFor(() => {});

        expect(setFieldValueFn).toHaveBeenNthCalledWith(1, 'photo', photo1);

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo2] } });
        });
        await waitFor(() => {});

        expect(asFragment()).toMatchSnapshot();
        expect(setFieldValueFn).toHaveBeenNthCalledWith(2, 'photo', photo2);
      });

      it('should render delete button and info when the same photo is uploaded twice', async () => {
        const photo = mockFile.create('boots.jpg', maxPossibleFileSize, 'image/jpeg');
        const setFieldValueFn = jest.fn();

        const { asFragment } = setUp(false, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo] } });
        });
        await waitFor(() => {});

        expect(setFieldValueFn).toHaveBeenNthCalledWith(1, 'photo', photo);

        await waitFor(() => {
          fireEvent.click(screen.getByText('Delete'));
        });
        await waitFor(() => {});

        expect(setFieldValueFn).toHaveBeenNthCalledWith(2, 'photo', null);

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo] } });
        });
        await waitFor(() => {});

        expect(asFragment()).toMatchSnapshot();
        expect(setFieldValueFn).toHaveBeenNthCalledWith(3, 'photo', photo);
      });
    });

    describe('show errors', () => {
      it('should render delete button and info when error appeared and then photo is uploaded correctly', async () => {
        const invalidPhoto = mockFile.create('boots.svg', maxPossibleFileSize, 'image/svg+xml');
        const validPhoto = mockFile.create('boots.png', maxPossibleFileSize, 'image/png');
        const setFieldValueFn = jest.fn();

        const { asFragment } = setUp(false, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [invalidPhoto] } });
        });
        await waitFor(() => {});

        expect(setFieldValueFn).toHaveBeenNthCalledWith(1, 'photo', productPhotoFieldValues.ERROR);
        expect(
          screen.getByText('File extension is not valid (JPG and PNG only)'),
        ).toBeInTheDocument();

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [validPhoto] } });
        });
        await waitFor(() => {});

        expect(asFragment()).toMatchSnapshot();
        expect(setFieldValueFn).toHaveBeenNthCalledWith(2, 'photo', validPhoto);
        expect(setFieldValueFn).toHaveBeenCalledTimes(2);
      });

      it('should render with error, delete button and file info when size is too big', async () => {
        const photo = mockFile.create('boots.png', tooBigFileSize, 'image/png');
        const setFieldValueFn = jest.fn();

        const { asFragment } = setUp(true, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo] } });
        });
        await waitFor(() => {});

        expect(asFragment()).toMatchSnapshot();
        expect(setFieldValueFn).toHaveBeenCalledWith('photo', productPhotoFieldValues.ERROR);
      });

      it('should render with error, delete button and file info when image type is incorrect', async () => {
        const photo = mockFile.create('boots.svg', maxPossibleFileSize, 'image/svg+xml');
        const setFieldValueFn = jest.fn();

        const { asFragment } = setUp(false, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo] } });
        });
        await waitFor(() => {});

        expect(asFragment()).toMatchSnapshot();
        expect(setFieldValueFn).toHaveBeenCalledWith('photo', productPhotoFieldValues.ERROR);
      });
    });

    describe('default view', () => {
      it('should render default view after deleting current photo', async () => {
        const setFieldValueFn = jest.fn();
        const { asFragment } = setUp(true, setFieldValueFn);

        await waitFor(() => {
          fireEvent.click(screen.getByText('Delete current'));
        });
        await waitFor(() => {});

        expect(asFragment()).toMatchSnapshot();
        expect(setFieldValueFn).toHaveBeenCalledWith('photo', productPhotoFieldValues.DELETED);
      });

      it('should render default view when files field has 0 length', async () => {
        const setFieldValueFn = jest.fn();
        const { asFragment } = setUp(false, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [] } });
        });
        await waitFor(() => {});

        expect(asFragment()).toMatchSnapshot();
        expect(setFieldValueFn).not.toHaveBeenCalled();
      });

      it('should render default view when file is uploaded and deleted', async () => {
        const photo = mockFile.create('boots.jpg', maxPossibleFileSize, 'image/jpeg');
        const setFieldValueFn = jest.fn();

        const { asFragment } = setUp(false, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo] } });
        });
        await waitFor(() => {});

        expect(setFieldValueFn).toHaveBeenNthCalledWith(1, 'photo', photo);

        await waitFor(() => {
          fireEvent.click(screen.getByText('Delete'));
        });
        await waitFor(() => {});

        expect(asFragment()).toMatchSnapshot();
        expect(setFieldValueFn).toHaveBeenNthCalledWith(2, 'photo', null);
      });
    });
  });
});
