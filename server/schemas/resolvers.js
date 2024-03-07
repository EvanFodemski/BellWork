const { User, Lift } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => User.find().populate('lifts'),

        user: async (_, { username }) => User.findOne({ username }).populate('lifts'),

        lifts: async (_, args) => { return Lift.find() },

        lift: async (_, { _id }) => Lift.findById(_id),

        me: async (_, __, { user }) => {
            if (user) {
                return User.findById(user._id).populate('lifts')
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        createWorkout: async (parent, { name, targets, liftComments, excercises, userId }, context) => {
            if
                (userId) {
                const lift = await Lift.create({ name, targets, liftComments, excercises, userId });

                await User.findOneAndUpdate(
                    { _id: userId },
                    { $push: { lifts: lift._id } },
                )
                return

            }
        },
        addExercise: async (_, { liftId, name, sets, reps, comments }) => {
            return Lift.findOneAndUpdate(
                { _id: liftId },
                {
                    $addToSet: { excercises: { name, sets, reps, comments } }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        
    }
}


module.exports = resolvers;

