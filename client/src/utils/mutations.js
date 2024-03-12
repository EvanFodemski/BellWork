import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const CREATE_WORKOUT = gql`
mutation CreateWorkout($name: String!, $targets: String!, $userId: ID!, $liftComments: String) {
  createWorkout(name: $name, targets: $targets, userId: $userId, liftComments: $liftComments) {
    _id
    createdAt
    createdBy
    liftComments
    name
    targets
  }
}
`;

