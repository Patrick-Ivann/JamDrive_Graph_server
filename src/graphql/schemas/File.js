// Imports: GraphQL
import {
    gql
} from 'apollo-server-express';

// GraphQL: TypeDefs
export const PROMOTYPEDEFS = gql `

  type PrositFile {
    id: ID!
    title: String!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
    createdAt : String!
}


type Ressource {
    id: ID!
    title: String!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
    createdAt : String!
}

  extend type Query {
    promos: [Promo]
    promo: Promo
    promoById(id:ID!):Promo
  }
  

  extend type Mutation {


    UploadAllerProsit(file: Upload!,title:String!):PrositFile!
    UploadRetourProsit(file: Upload!,title:String!):PrositFile!
    UploadRessource(file: Upload!):Ressource!
    DeleteProsit(id:ID!):Boolean!
    DeleteRessource(id:ID!):Boolean
  }


  extend type Subscription {}


  `