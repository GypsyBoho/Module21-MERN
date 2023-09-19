const { User } = require('../models');
const { signToken, authenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, arg, context) => {
            if (context.user) {
                const user = await User.findById(context.user.id).select("-password");
                return user;
            }
            throw authenticationError
        }
    },
    //login
    //token then I can use sandbox
    // get route need context in order to work

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            console.log(username, email, password)
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw authenticationError;
            }
            const matchingPsw = await user.isCorrectPassword(password);

            if (!matchingPsw) {
                throw authenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { bookData }, context) => {
            console.log(context.user);
            if (context.user) {
                console.log(bookData);
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true, runValidators: true },
                )
            }
        },
        deleteBook: async (parent, { username, bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate({ _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true })
                if (!updatedUser) {
                    return resolvers.status(404).json({ message: 'No book found with that Id' });
                }
                return updatedUser
            }
            throw authenticationError;
        },
    },
}

module.exports = resolvers;