const { ApolloServer, gql } = require('apollo-server');
const {mainCards, animals, categories} = require('./db');

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
  type Category {
    id: ID!
    image: String!
    category: String!
    slug: String!
  }
  type Query {
    mainCard : [MainCard]
    animals : [Animal]
    animal(slug: String!) : Animal
    categories: [Category!]!

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
      },
      categories : () => categories
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