const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        lifts: [Lift]
    }

    type Lift {
        _id: ID
        name: String!
        createdBy: String!
        liftText: String!
        createdAt: String!
        liftType: String!
        excercises: [Excercises]!
    }

    type Excercises {
        _id: ID
        name: String!
        sets: Int!
        reps: Int!
        specifics: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        lifts(username: String): [Lift]
        lift(_id: ID!): Lift
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addLift(name: String!, liftText: String!, liftType: String!, excercises: [Excercises]!): Lift
        addExcercise(liftId: ID!, name: String!, sets: Int!, reps: Int!, specifics: String!): Lift
        removeLift(liftId: ID!): Lift
        removeExcercise(liftId: ID!, excerciseId: ID!): Lift
    }
`;

module.exports = typeDefs;