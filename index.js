const { ApolloServer, gql } = require('apollo-server');
const {mainCards, animals} = require('./db');

const typeDefs = gql`
  type MainCard {
    title: String!
    image: String!
  }

  type Animal {
    id: ID!
    image: String!
    title: String!
    rating: Float
    price: String!
    description: [String!]!
    slug: String!
    stock : Int!
    onSale : Boolean
  }
  type Query {
    mainCard : [MainCard]
    animals : [Animal]
    animal(slug: String!) : Animal

  }
`; 
  const mainCard = mainCards;
  const animal = animals;

  const resolvers = {
    Query: {
      mainCard: () => mainCard,
      animals: () => animals,
      animal:(parent, args, ctx) => {
        let animal = animals.find((animal)=>{
          return animal.slug === args.slug
        })
        return animal
      }
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