// Imports: GraphQL
import {
    gql
  } from 'apollo-server-express';
  
  // GraphQL: TypeDefs
  const PROMOTYPEDEFS = gql `
  type Query {
    promos: [Promo]
    promo: Promo
    promoById(id:ID!):Promo
  }
  
  type Promo {
    _id: ID!
    promo: String!  
    utilisateurs: [Utilisateur]
    debutValidite:String!
    finValidite:String!
  }


   type Utilisateur {
    _id: ID!
    promoId: String!  
    motDePasse:String!
  }
  
  type Mutation {
    pushPromo(promo:String!
        motDePasse:String!
        superMotDePasse:String!): Promo
    popPromo(_id: ID!): ID

    pushUtilisateur(promoId:String!
      motDePasse:String!): Utilisateur
  popUtilisateur(_id: ID!): ID
  }
  
    type Subscription {
      newPromo: [Promo]
      PromoDeleted :[Promo]
    }
  
  `;
  // Exports
  export default PROMOTYPEDEFS;