const { User, Lift, Schedule } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => User.find().populate('lifts'),

        user: async (_, { _id }) => User.findOne({ _id }).populate('lifts'),

        lifts: async (_, args) => { return Lift.find() },

        lift: async (_, { _id }) => Lift.findById(_id),

        // schedule: async (_, { _id}) => Schedule.findById(_id),

        // schedules: async (_, args) => { return Schedule.find() },

        excercises: async (_, { liftId }) => {
            const lift = await Lift.findById(liftId);

            if (!lift) {
                throw new Error('No lift found with this id!');
            }
            return lift.excercises;
        },


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
                return lift;

            }
        },
        createSchedule: async (parent, { name, days , userId}, context) => {
            if (userId) {
                const schedule = await Schedule.create({ name, days, userId})

                await User.findOneAndUpdate(
                    { _id: userId },
                    { $push: { schedules: schedule._id }}
                )
                return schedule;
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
       
        addLiftToYours: async (_, { userId, liftId }) => {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('No user with this id!');
                }

                const lift = await Lift.findById(liftId);
                if (!lift) {
                    throw new Error('No lift with this id!');
                }

                user.lifts.push(lift);
                await user.save();
                return user;
            } catch (error) {
                throw new Error(error);


            }
        },

        deleteWorkout: async (_, { name }) => {
            try {
                const lift = await Lift.findOne({ name });

                if (!lift) {
                    throw new Error('No lift found with this name!');
                }

                await Lift.findByIdAndDelete(lift._id);

                await User.updateOne(
                    { lifts: lift._id },
                    { $pull: { lifts: lift._id } }
                );

                return lift;
            } catch (error) {
                throw new Error(error.message);
            }
        },

        addFriend: async (_, { userId, friendName }) => {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('No user found with this id!');
                }

                const friend = await User.findOne({ username: friendName });
                if (!friend) {
                    throw new Error('No user found with this username!');
                }

                if (user.friends.includes(friend._id)) {
                    throw new Error('You are already friends with this user!');
                }

                user.friends.push(friend);
                await user.save();

                const notification = {
                    sender: user,
                    message: `${user.username} has added you as a friend!`,
                    timestamp: new Date(),
                };
                
                friend.notifications.push(notification);
                await friend.save();

                return user;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        addDescription: async (_, { description, userId }) => {
            try {
                
                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    { description: description }, 
                    { new: true, runValidators: true } 
                );
        
                if (!updatedUser) {
                    throw new Error("User not found.");
                }
        
                return updatedUser; 
            } catch (error) {
                throw new Error("Failed to update description: " + error.message);
            }
        },
        addLike: async (_, { liftId }) => {
            try {
                const lift = await Lift.findByIdAndUpdate(
                    liftId,
                    { $inc: { likes: 1 } }, // Increment likes by 1
                    { new: true }
                );
    
                if (!lift) {
                    throw new Error('No lift found with this id!');
                }
    
                return lift;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        addDisLike: async (_, { liftId }) => {
            try {
                const lift = await Lift.findByIdAndUpdate(
                    liftId,
                    { $inc: { dislikes: 1 } }, // Increment dislikes by 1
                    { new: true }
                );
    
                if (!lift) {
                    throw new Error('No lift found with this id!');
                }
    
                return lift;
            } catch (error) {
                throw new Error(error.message);
            }
        },

      




    }


    
}


module.exports = resolvers;

