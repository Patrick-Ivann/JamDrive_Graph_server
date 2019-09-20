import {
  makeExecutableSchema
} from 'graphql-tools';
// Imports: GraphQL
import {
    gql
} from 'apollo-server-express';

// GraphQL: TypeDefs
const TYPEDEFSLINKSCHEMA = gql `

#directive @isAuthenticated on FIELD | FIELD_DEFINITION
directive @hasRole(role: String) on FIELD | FIELD_DEFINITION




type Query {

  _:Boolean
  date : String
}


type Mutation {

  _: Boolean
}

type Subscription {

  _:Boolean
}
` 

export default TYPEDEFSLINKSCHEMA;