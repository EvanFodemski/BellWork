# BELL
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[link to live Deploy](lol)

# BELL workout buddy

Brief description... If your reading this this app is in progress

## Table of Contents

## Images

## Installation and Usage

## Badges

## Credits

## Contributors

## License
addExcercise: async (_, { liftId, name, sets, reps, comments }, { user }) => {
            if (user) {
                const lift = await Lift.findByIdAndUpdate(
                    liftId,
                    { $push: { excercises: { name, sets, reps, comments } } },
                    { new: true }
                );
                return lift;
            }
            throw new AuthenticationError('You need to be logged in!');


        }