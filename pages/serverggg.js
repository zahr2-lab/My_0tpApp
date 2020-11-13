const { GraphQLServer } = require("graphql-yoga");

const messages = [];
const typeDefs = `
type Message{
  id:ID!,
  user: String!,
  content: String!
}

type Query{
  messages:[Messages!]
}

type Mutation{
  postMessage(user:String!,message:String!):ID
}
`;
const resolvers = {
  Query: { messages: () => messages },
  Mutation: {
    postMessage: (parent, { user, content }) => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content
      });
      return id;
    }
  }
};

const server = GraphQLServer({ typeDefs, resolvers });

server.start(({ port }) => {
  console.log(port);
});
