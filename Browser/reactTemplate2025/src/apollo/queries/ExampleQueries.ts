import { gql } from '@apollo/client/core';

export const GET_BOOK_REQUEST = gql`
  query getExample($id: Int!) {
    getExample(id: $id) {
      name
      author
      value
    }
  }
`;
