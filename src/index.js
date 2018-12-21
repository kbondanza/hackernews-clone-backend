const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Subscription = require("./resolvers/Subscription");
const Vote = require("./resolvers/Vote");

// Resolvers object is the implementation of the GraphQL schema
// resolver always has to be named after the corresponding field from the schema definition
const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

// Schema and Resolvers are bundled and passed to the GraphQLServer.
// This tells the server what API operations are accepted and how they should be resolved
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
