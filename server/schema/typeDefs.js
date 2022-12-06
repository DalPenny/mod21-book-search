const { gql } = require('apollo-server-express');

const typeDefs = gql`
# Set up Auth to handle data returned from a user login
type Auth {
  token: ID!
  user: User
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }


  type User {
    _id: ID!
    username: String!
    email: String
    savedBooks: [Book]
  }



`;
module.exports = typeDefs;