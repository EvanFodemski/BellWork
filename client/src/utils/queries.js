import { gql } from '@apollo/client';

export const  GET_LIFTS = gql`
query Lifts {
  lifts {
    _id
    createdAt
    createdBy
    excercises {
      _id
      comments
      name
      reps
      sets
    }
    liftComments
    name
    targets
  }
}
`;

export const ACTIVE_USER_LIFTS = gql`
query User($id: ID!) {
  user(_id: $id) {
    lifts {
      _id
      createdAt
      liftComments
      name
      targets
      excercises {
        _id
        comments
        name
        reps
        sets
      }
    }
  }
}
`;

export const GET_EXCERCISES = gql`
query Excercises($liftId: ID!) {
  excercises(liftId: $liftId) {
    _id
    name
    sets
    reps
    comments
  }
}
`;

export const GET_ALL_USERS = gql`
query Users {
  users {
    username
    description
    _id
    email
    lifts {
      _id
      createdAt
      liftComments
      name
      targets
      excercises {
        _id
        comments
        name
        reps
        sets
      }
    }
    friends {
      _id
    }
  }
}
`;

export const ADD_FRIEND = gql`
mutation AddFriend($userId: ID!, $friendName: String!) {
  addFriend(userId: $userId, friendName: $friendName) {
    username
    _id
    email
    lifts {
      _id
      excercises {
        _id
        comments
        name
        reps
        sets
      }
      liftComments
      name
      targets
    }
    friends {
      _id
      email
      lifts {
        _id
        excercises {
          _id
          comments
          name
          reps
          sets
        }
        liftComments
        name
        targets
      }
      username
    }
  }
}
`;

export const GET_ME = gql`
query Query {
  me {
    _id
    description
    email
    friends {
      _id
      description
      email
      friends {
        _id
        description
      }
      lifts {
        _id
        createdAt
        excercises {
          _id
          comments
          name
          reps
          sets
        }
        name
        targets
      }
    }
  }
}
`;