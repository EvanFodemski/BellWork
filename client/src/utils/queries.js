import { gql } from '@apollo/client';

export const  GET_LIFTS = gql`
query Lifts {
    lifts {
      createdAt
      liftComments
      name
      targets
      _id
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