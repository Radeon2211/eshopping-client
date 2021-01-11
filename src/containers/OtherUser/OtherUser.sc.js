import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const ContactData = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacings.level3};

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacings.level3};
  }

  & .single-data {
    display: flex;
    font-size: ${({ theme }) => theme.fontSizes.level4};
  }
`;
