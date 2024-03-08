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
        createdBy: String
        targets: String!
        liftComments: String
        createdAt: String!
    }

    type Excercise {
        _id: ID
        name: String!
        sets: Int!
        reps: Int!
        comments: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        lifts: [Lift]
        lift(_id: ID!): Lift
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createWorkout(name: String!, targets: String!, liftComments: String, userId: ID!): Lift
        addExercise(liftId: ID!, name: String!, sets: Int!, reps: Int!, comments: String): Lift
        removeLift(liftId: ID!): Lift
    }
`;

module.exports = typeDefs;