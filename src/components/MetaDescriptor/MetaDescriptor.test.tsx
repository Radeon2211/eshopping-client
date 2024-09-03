import { render, waitFor } from '@testing-library/react';
import MetaDescriptor from './MetaDescriptor';

describe('<MetaDescriptor />', () => {
  describe('check how renders', () => {
    it('should render with title and description', async () => {
      const title = 'Test title';
      const description = 'Test description';
      render(<MetaDescriptor title={title} description={description} />);

      await waitFor(() => {
        expect(document.title).toEqual(title);
        const metaDescription = document
          .querySelector('meta[name="description"]')
          ?.getAttribute('content');
        expect(metaDescription).toEqual(description);
      });
    });

    it('should render with title only', async () => {
      const title = 'Test title';
      render(<MetaDescriptor title={title} />);

      await waitFor(() => {
        expect(document.title).toEqual(title);
        const metaDescription = document.querySelector('meta[name="description"]');
        expect(metaDescription).toBeNull();
      });
    });
  });
});
