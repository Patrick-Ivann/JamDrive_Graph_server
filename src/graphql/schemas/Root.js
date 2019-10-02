import {
      gql
  } from 'apollo-server-express';
  
  // GraphQL: TypeDefs
 export const ROOTTYPEDEFS = gql `
  enum Role {
    admin
    editor
    supervisor
    user
  }

  directive @isAuthenticated on FIELD | FIELD_DEFINITION
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