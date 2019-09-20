// Imports: GraphQL
import {
  gql
} from 'apollo-server-express';

// GraphQL: TypeDefs
const PROSITTYPEDEFS = gql `
extend type Query {
  prosits: [Prosit]
  prosit: Prosit
  prositByPromo(idPromo:ID!):Prosit
  prositById(id:ID!):Prosit
}

type Prosit {
  validation: Int
  _id: ID!
  motsClef: [String]
  unite: String!
  nomProsit: String!
  promoId: String!
  ressources: [Ressource]
  aller: String
  retour: String
}

type Ressource {
  nomRessource: String
  urlRessource: String
}

extend type Mutation {
  pushProsit(validation: Int, motsClef: String, unite: String!, nomProsit: String!, promoId: String!): Prosit
  popProsit(_id: ID!): Boolean
  updateProsit(validation: String, motsClef: String, unite: String): Prosit
}

  extend type Subscription {
    newProsit: [Prosit]
    prositDeleted :[Prosit]
    prositUpdated: Prosit
  }

`;
// Exports
export default PROSITTYPEDEFS;