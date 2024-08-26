const graphql = require("graphql");
const axios = require("axios");

// Lib Imports
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  // all the keys of the properties that the user has
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http:localhost:3000/users/${args.id}`)
          .then((resp) => resp.data)
        
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
