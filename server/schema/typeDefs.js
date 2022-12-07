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

  type User {
    _id: ID!
    username: String!
    email: String
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  input inpBookData {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: inpBookData!): User
    removeBook(bookId: ID!): User
  }



`;
module.exports = typeDefs;