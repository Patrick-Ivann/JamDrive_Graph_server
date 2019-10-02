import {
    ApolloServer
} from 'apollo-server-express';
// Imports: GraphQL TypeDefs & Resolvers
import TYPEDEFS from './Types.js';
import RESOLVERS from './Resolvers.js';
import { PrositResolver } from './resolvers/PrositResolver.js';
import { PromoResolver } from './resolvers/PromoResoler.js';
import { corsWrapper } from '../CORS.js';
import PROMOTYPEDEFS from './schemas/Promo.js';
import PROSITTYPEDEFS from './schemas/Prosit.js';
import { ROOTTYPEDEFS } from './schemas/Root.js';
import { isAuthenticatedDirective } from './directives/isAuthenticated.js';
import { formatError } from './resolvers/utils/formatError.js';
// GraphQL: Schema
const APOLLOSERVER = new ApolloServer({
    cors: corsWrapper(),
    typeDefs: [ROOTTYPEDEFS,PROMOTYPEDEFS,PROSITTYPEDEFS],
    resolvers: [PrositResolver, PromoResolver],
    schemaDirectives : {
      isAuthenticated : isAuthenticatedDirective
      
  },
    subscriptions: {
        path:'/subscription',
        onConnect: () => console.log('Connected to websocket'),
  },
  /*schemaDirectives : {
    isAuthenticated : isAuthenticated
    
  },*/
    playground: {
        endpoint: `http://localhost:3667/graphql`,
        settings: {
            'editor.theme': 'dark'
        }
    },
    formatError: err => formatError(err),
    debug:true,
      tracing: true,
      plugins: [
        {
          requestDidStart({ request }) {
            // console.log(request.http);
            return {
              willSendResponse({ response }) {
              //  console.log(response);
              },
            };
          },
        },
      ],

});
// Exports
export default APOLLOSERVER;