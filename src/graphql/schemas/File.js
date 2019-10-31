// Imports: GraphQL
import {
    gql
} from 'apollo-server-express';

// GraphQL: TypeDefs
export const FILETYPEDEFS = gql `


extend type Query {

  filePathZippedByUnite(unite:String!): String!
  filePathZippedByPrositId(prositId:String!): String!

}


  type PrositFile {
    id: ID!
    title: String!
    nom:String!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
    createdAt : DateTime!
    updateAt: DateTime!
}


type Ressource {
    id: ID!
    title: String!
    nom:String!
    prositId:String!
    promoId:String!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
    createdAt : DateTime!
    updatedAt: DateTime!
}



  extend type Mutation {
    UploadAllerProsit(file: Upload!,title:String!, nom:String!,prositId:ID!):PrositFile
    UploadRetourProsit(file: Upload!,title:String!, nom:String!,prositId:ID!):PrositFile!
    UploadProfRessource(file:Upload!, title:String!, nom:String!, prositId:ID,unite:String):Ressource!
    UploadEleveRessource(file:Upload!, title:String!, nom:String!, prositId:ID,unite:String):Ressource!
    UploadRessource(file: Upload!):Ressource!
    DeleteProsit(id:ID!):Boolean!
    DeleteRessource(id:ID!):Boolean
  }


  `