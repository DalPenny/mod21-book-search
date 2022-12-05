const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// Import the ApolloServer class
const { ApolloServer } = require('apollo-server-express');

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');


const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create a new instance of an Apollo server with the GraphQL schema
//running our apollo server, add middleware from express app, once db is open listen at PORT
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
  })
};

// Call the async function to start the server, calling our startapolloserver and passing it the typedefs and resolvers
startApolloServer(typeDefs, resolvers);