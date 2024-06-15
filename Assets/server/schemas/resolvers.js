const { Book, User } = require('../models');
const { signToken, AuthError } = require('../utils/auth')
const resolvers = {
  Query: {
    me: async (parent, args, context) => { 
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id}).select('-__v -password');
        return userData 
      }
      throw AuthError
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)
      return {user, token}
    },
    logIn: async (parent, { email, password }) => {
      const user = await User.findOne({ email })
      if (!user) {
        throw AuthError
      }
      const correctPassword = await user.isCorrectPassword(password)
      if (!correctPassword) {
        throw AuthError
      }
      const token = signToken(user)
      return {user, token}
    },
    saveBook: async (parent, {bookData}, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate({ _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true })
        return updateUser
      }
      throw AuthError
    },
    removeBook: async (parent, {bookId}, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate({ _id: context.user._id },
          { $pull: { savedBooks: {bookId} } },
          { new: true })
        return updateUser
      }
      throw AuthError

    }

  }
};

module.exports = resolvers;