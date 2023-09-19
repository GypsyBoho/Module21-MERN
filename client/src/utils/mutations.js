import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`
export const SAVE_BOOK = gql`
mutation SaveBook($bookData: BookData!) {
    saveBook(bookData: $bookData) {
      _id
      bookCount
      email
      username
    }
  }
`
export const REMOVE_BOOK = gql`
mutation DeleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      _id
      bookCount
      email
      username
    }
  }
  `;
