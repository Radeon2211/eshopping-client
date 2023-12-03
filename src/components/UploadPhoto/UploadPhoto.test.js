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
      setUp(false);
      expect(screen.getByRole('button', { name: /upload photo/i }));
      expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
      expect(screen.getByTestId('UploadPhoto-default-preview'));
    });

    it('should render with delete current button when hasCurrentPhoto is true', () => {
      setUp(true);
      expect(screen.getByRole('button', { name: /upload photo/i }));
      expect(screen.getByRole('button', { name: /delete current/i }));
      expect(screen.queryByRole('button', { name: /^delete$/i })).not.toBeInTheDocument();
      expect(screen.getByTestId('UploadPhoto-default-preview'));
    });

    describe('successful upload', () => {
      it('should render delete button and info when photo is uploaded', async () => {
        const photo = mockFile.create('boots.jpg', maxPossibleFileSize, 'image/jpeg');
        const setFieldValueFn = jest.fn();

        setUp(false, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo] } });
        });
        await waitFor(() => {});

        expect(screen.getByRole('button', { name: /upload photo/i }));
        expect(screen.getByRole('button', { name: /delete/i }));
        expect(screen.queryByRole('button', { name: /delete current/i })).not.toBeInTheDocument();
        expect(screen.getByTestId('UploadPhoto-preview-photo-info')).toHaveTextContent(
          'Name: boots.jpgSize: 6 MB',
        );
        expect(setFieldValueFn).toHaveBeenCalledWith('photo', photo);
      });

      it('should render delete button and correct info when one photo is uploaded after another', async () => {
        const photo1 = mockFile.create('photo1.jpg', maxPossibleFileSize, 'image/jpeg');
        const photo2 = mockFile.create('photo2.jpg', maxPossibleFileSize, 'image/jpeg');
        const setFieldValueFn = jest.fn();

        setUp(false, setFieldValueFn);

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

        expect(screen.getByRole('button', { name: /upload photo/i }));
        expect(screen.getByRole('button', { name: /delete/i }));
        expect(screen.queryByRole('button', { name: /delete current/i })).not.toBeInTheDocument();
        expect(screen.getByTestId('UploadPhoto-preview-photo-info')).toHaveTextContent(
          'Name: photo2.jpgSize: 6 MB',
        );
        expect(setFieldValueFn).toHaveBeenNthCalledWith(2, 'photo', photo2);
      });

      it('should render delete button and info when the same photo is uploaded twice', async () => {
        const photo = mockFile.create('boots.jpg', maxPossibleFileSize, 'image/jpeg');
        const setFieldValueFn = jest.fn();

        setUp(false, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo] } });
        });
        await waitFor(() => {});

        expect(setFieldValueFn).toHaveBeenNthCalledWith(1, 'photo', photo);

        await waitFor(() => {
          fireEvent.click(screen.getByRole('button', { name: /delete/i }));
        });
        await waitFor(() => {});

        expect(setFieldValueFn).toHaveBeenNthCalledWith(2, 'photo', null);

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo] } });
        });
        await waitFor(() => {});

        expect(screen.getByRole('button', { name: /upload photo/i }));
        expect(screen.getByRole('button', { name: /delete/i }));
        expect(screen.queryByRole('button', { name: /delete current/i })).not.toBeInTheDocument();
        expect(screen.getByTestId('UploadPhoto-preview-photo-info')).toHaveTextContent(
          'Name: boots.jpgSize: 6 MB',
        );
        expect(setFieldValueFn).toHaveBeenNthCalledWith(3, 'photo', photo);
      });
    });

    describe('show errors', () => {
      it('should render delete button and info when error appeared and then photo is uploaded correctly', async () => {
        const invalidPhoto = mockFile.create('boots.svg', maxPossibleFileSize, 'image/svg+xml');
        const validPhoto = mockFile.create('boots.png', maxPossibleFileSize, 'image/png');
        const setFieldValueFn = jest.fn();

        setUp(false, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [invalidPhoto] } });
        });
        await waitFor(() => {});

        expect(setFieldValueFn).toHaveBeenNthCalledWith(1, 'photo', productPhotoFieldValues.ERROR);
        expect(screen.getByText(/file extension is not valid/i));
        expect(screen.getByTestId('UploadPhoto-preview-photo-info')).toHaveTextContent(
          'Name: boots.svgSize: 6 MB',
        );

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [validPhoto] } });
        });
        await waitFor(() => {});

        expect(screen.getByRole('button', { name: /upload photo/i }));
        expect(screen.getByRole('button', { name: /delete/i }));
        expect(screen.queryByRole('button', { name: /delete current/i })).not.toBeInTheDocument();
        expect(screen.queryByText(/file extension is not valid/i)).not.toBeInTheDocument();
        expect(screen.getByTestId('UploadPhoto-preview-photo-info')).toHaveTextContent(
          'Name: boots.pngSize: 6 MB',
        );
        expect(setFieldValueFn).toHaveBeenNthCalledWith(2, 'photo', validPhoto);
        expect(setFieldValueFn).toHaveBeenCalledTimes(2);
      });

      it('should render with error, delete button, file info when size is too big and delete current button when initially has photo', async () => {
        const photo = mockFile.create('boots.png', tooBigFileSize, 'image/png');
        const setFieldValueFn = jest.fn();

        setUp(true, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo] } });
        });
        await waitFor(() => {});

        expect(screen.getByRole('button', { name: /upload photo/i }));
        expect(screen.getByRole('button', { name: /^delete$/i }));
        expect(screen.getByRole('button', { name: /delete current/i }));
        expect(screen.getByText(/Maximum available size is 6 MB/i));
        expect(screen.getByTestId('UploadPhoto-preview-photo-info')).toHaveTextContent(
          'Name: boots.pngSize: 6,1 MB',
        );
        expect(setFieldValueFn).toHaveBeenCalledWith('photo', productPhotoFieldValues.ERROR);
      });

      it('should render with error, delete button and file info when image type is incorrect', async () => {
        const photo = mockFile.create('boots.svg', maxPossibleFileSize, 'image/svg+xml');
        const setFieldValueFn = jest.fn();

        setUp(false, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo] } });
        });
        await waitFor(() => {});

        expect(screen.getByRole('button', { name: /upload photo/i }));
        expect(screen.getByRole('button', { name: /delete/i }));
        expect(screen.queryByRole('button', { name: /delete current/i })).not.toBeInTheDocument();
        expect(screen.getByText(/File extension is not valid \(JPG and PNG only\)/i));
        expect(screen.getByTestId('UploadPhoto-preview-photo-info')).toHaveTextContent(
          'Name: boots.svgSize: 6 MB',
        );
        expect(setFieldValueFn).toHaveBeenCalledWith('photo', productPhotoFieldValues.ERROR);
      });
    });

    describe('default view', () => {
      it('should render default view after deleting current photo', async () => {
        const setFieldValueFn = jest.fn();
        setUp(true, setFieldValueFn);

        await waitFor(() => {
          fireEvent.click(screen.getByRole('button', { name: /delete current/i }));
        });
        await waitFor(() => {});

        expect(screen.getByRole('button', { name: /upload photo/i }));
        expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
        expect(screen.getByTestId('UploadPhoto-default-preview'));
        expect(setFieldValueFn).toHaveBeenCalledWith('photo', productPhotoFieldValues.DELETED);
      });

      it('should render default view when files field has 0 length', async () => {
        const setFieldValueFn = jest.fn();
        setUp(false, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [] } });
        });
        await waitFor(() => {});

        expect(screen.getByRole('button', { name: /upload photo/i }));
        expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
        expect(screen.getByTestId('UploadPhoto-default-preview'));
        expect(setFieldValueFn).not.toHaveBeenCalled();
      });

      it('should render default view when file is uploaded and deleted', async () => {
        const photo = mockFile.create('boots.jpg', maxPossibleFileSize, 'image/jpeg');
        const setFieldValueFn = jest.fn();

        setUp(false, setFieldValueFn);

        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [photo] } });
        });
        await waitFor(() => {});

        expect(setFieldValueFn).toHaveBeenNthCalledWith(1, 'photo', photo);
        expect(screen.getByTestId('UploadPhoto-preview-photo-info')).toHaveTextContent(
          'Name: boots.jpgSize: 6 MB',
        );

        await waitFor(() => {
          fireEvent.click(screen.getByRole('button', { name: /delete/i }));
        });
        await waitFor(() => {});

        expect(screen.getByRole('button', { name: /upload photo/i }));
        expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
        expect(screen.getByTestId('UploadPhoto-default-preview'));
        expect(setFieldValueFn).toHaveBeenNthCalledWith(2, 'photo', null);
      });
    });
  });
});
