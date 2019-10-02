// Imports: GraphQL
import {
    gql
  } from 'apollo-server-express';
  
  // GraphQL: TypeDefs
  const PROMOTYPEDEFS = gql `
 
  extend type Query {
    promos: [Promo]
    promo: Promo
    promoById(id:ID!):Promo
    himself: Utilisateur @isAuthenticated
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
    role:Role!
    motDePasse:String!
  }
  
  extend type Mutation {
    pushPromo(promo:String!): Promo
    popPromo(_id: ID!): ID
    pushUtilisateur(promoId:String! motDePasse:String! role:Role!): Utilisateur
    popUtilisateur(_id: ID!): ID

    loginUser(motDePasse:String!):Utilisateur
    logoutUser:Boolean

  }
  
 extend type Subscription {
      newPromo: [Promo]
      PromoDeleted :[Promo]
    }
  
  `;
  // Exports
  export default PROMOTYPEDEFS;