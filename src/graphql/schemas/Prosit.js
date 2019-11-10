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
  prositsByUnite(unite:String!):[Prosit]
  prositById(id:ID!):Prosit!
  PrositAller:[Prosit!]
  PrositRetour:[Prosit!]

  unites:[Unite]!
}

type Unite {
  promoId:String!
  unite:String!
  prosits:[Prosit]!
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
  allerFichier:PrositFile
  retourFichier:PrositFile
  ressourceProf:[Ressource]!
  ressourceEleve:[Ressource]!
  retour: String
  createdAt:DateTime!
  updatedAt:DateTime!
}


extend type Mutation {
  pushProsit(validation: Int, motsClef: String, unite: String!, nomProsit: String!): Prosit
  popProsit(id: ID!): Boolean
  updateProsit(validation: String, motsClef: String, unite: String): Prosit
  validateProsit(id:ID!):Boolean
}

  extend type Subscription {
    prositCreated: Prosit
    prositDeleted :Prosit
    prositUpdated: Prosit
    prositValidated: Prosit

  }

`;
// Exports
export default PROSITTYPEDEFS;