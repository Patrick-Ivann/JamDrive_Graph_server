// Imports: GraphQL
import {
  gql
} from 'apollo-server-express';

// GraphQL: TypeDefs
const PROSITTYPEDEFS = gql `
extend type Query {
  prosits: [Prosit!]!
  prosit: Prosit!
  prositsByPromo:[Prosit!]
  prositsByPromoId(idPromo:ID!):[Prosit!]
  prositById(id:ID!):Prosit!
  PrositAller:[Prosit!]
  PrositRetour:[Prosit!]
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
  allerFichier:PrositFile!
  retourFichier:PrositFile
  ressourceProf:[Ressource]!
  ressourceEleve:[Ressource]!
  retour: String
  createdAt:DateTime!
  updatedAt:DateTime!
}


extend type Mutation {
  pushProsit(validation: Int, motsClef: String, unite: String!, nomProsit: String!): Prosit
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