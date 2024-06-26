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

export const CREATE_SCHEDULE=gql`
mutation CreateSchedule($userId: ID!, $name: String!) {
  createSchedule(userId: $userId, name: $name) {
    _id
    name
  }
}
`;

export const ADD_DAY = gql `
mutation AddDay($scheduleId: ID!, $liftId: ID!) {
  addDay(scheduleId: $scheduleId, liftId: $liftId) {
    _id
  }
}
`;

export const ADD_LIFT=gql`
mutation AddLiftToYours($userId: ID!, $liftId: ID!) {
  addLiftToYours(userId: $userId, liftId: $liftId) {
    _id
    email
    username
  }
}
`;

export const ADD_EXERCISE=gql`
mutation AddExercise($liftId: ID!, $name: String!, $sets: Int!, $reps: Int!, $comments: String) {
  addExercise(liftId: $liftId, name: $name, sets: $sets, reps: $reps, comments: $comments) {
    _id
    createdAt
    liftComments
    name
    excercises {
      _id
      comments
      name
      reps
      sets
    }
    targets
  }
}
`;

export const DELETE_LIFT=gql`
mutation DeleteWorkout($name: String!) {
  deleteWorkout(name: $name) {
    _id
  }
}
`;

export const ADD_FRIEND = gql`
mutation AddFriend($userId: ID!, $friendName: String!) {
  addFriend(userId: $userId, friendName: $friendName) {
    _id
  }
}
`;


export const ADD_DESCRIPTION =gql`
mutation AddDescription($userId: ID!, $description: String) {
  addDescription(userId: $userId, description: $description) {
    _id
  }
}
`;

export const ADD_LIKE = gql `
mutation AddLike($liftId: ID!) {
  addLike(liftId: $liftId) {
    _id
  }
}
`;

export const ADD_DISLIKE = gql `
mutation AddDisLike($liftId: ID!) {
  addDisLike(liftId: $liftId) {
    _id
  }
}
`