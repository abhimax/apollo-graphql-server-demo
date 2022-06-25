const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type MainCard {
    title: String!
    image: String!
  }
  type Query {
    books: [Book]
    mainCard : [MainCard]
  }
`;

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  const mainCard = [
    {
      title: 'Lion',
      image: 'lion-image.jpg',
    },
    {
        title: 'Rabbit',
        image: 'rabbit-image.jpg',
      },
      {
        title: 'Cat',
        image: 'cat-image.jpg',
      },
  ];

  const resolvers = {
    Query: {
      books: () => books,
      mainCard: () => mainCard,
    },
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
  });
  
  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });