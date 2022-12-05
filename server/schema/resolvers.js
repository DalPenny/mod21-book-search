const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
            const userData = await User.findOne({_id: context.user.id}).select('-password');

            return userData;
        }

        throw new AuthenticationError('You are not logged in!');

    },
},




};

module.exports = resolvers;