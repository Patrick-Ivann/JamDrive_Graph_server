import {
    ApolloServer
} from 'apollo-server-express';
// Imports: GraphQL TypeDefs & Resolvers
import TYPEDEFS from './Types.1.js';
import RESOLVERS from './Resolvers.1.js';
import { PromoResolver } from './resolvers/PromoResoler.js';
const connectMongo = require('../database/mongoConnection');

// GraphQL: Schema
const APOLLOSERVER = new ApolloServer({
    typeDefs: [TYPEDEFS],
    resolvers: [PromoResolver],
    subscriptions: {
        path:'/subscription',
        onConnect: () => console.log('Connected to websocket'),
         onDisconnect: () => {
             console.log("Disconnected from websocket")
         },
  },
  context: async () => ({
      database: await connectMongo(),
  }),
    playground: {
        endpoint: `http://localhost:4000/graphql`,
        settings: {
            'editor.theme': 'dark'
        }
    },
    debug:true,
      tracing: true,

});
// Exports
export default APOLLOSERVER;