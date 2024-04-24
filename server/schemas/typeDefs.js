const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        lifts: [Lift]
        friends: [User]
        description: String
        notifications: [Notification] 
        schedules: [Schedule]   
    }

    type Lift {
        _id: ID
        name: String!
        likes: Int
        dislikes: Int
        createdBy: String
        targets: String!
        liftComments: String
        createdAt: String!
        excercises: [Excercise]
    }

    type Schedule {
        _id: ID
        name: String!
        days: [Days]
        scheduleComments: String
    }

    type Days {
        _id: ID
        amount: Int!
        excercises: [Excercise]
    }

    type Excercise {
        _id: ID
        name: String!
        sets: Int!
        reps: Int!
        comments: String
    }

    type Notification {
        _id: ID
        sender: User
        message: String
        timestamp: String
        status: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(_id: ID!): User
        lifts: [Lift]
        lift(_id: ID!): Lift
        excercises(liftId: ID!): [Excercise]
        me: User
        notifications: [Notification] 
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createWorkout(name: String!, targets: String!, liftComments: String, userId: ID!): Lift
        addExercise(liftId: ID!, name: String!, sets: Int!, reps: Int!, comments: String): Lift
        addLike(liftId: ID!): Lift
        addDisLike(liftId: ID!): Lift
        deleteWorkout(name: String!): Lift
        addLiftToYours(userId: ID!, liftId: ID!): User
        addFriend(userId: ID!, friendName: String!): User
        addDescription(userId: ID!, description: String): User
        createSchedule(userId: ID!, name: String!): Schedule
        addDays(scheduleId: ID!, amount: Int!): Schedule
        addExcercise(dayId: ID!, excerciseId: ID!): Days
    }
`;


module.exports = typeDefs;