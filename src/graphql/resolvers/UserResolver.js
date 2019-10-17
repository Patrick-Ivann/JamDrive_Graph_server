import Utilisateurs from "../../mongoDB/Utilisateur";
import {
    ApolloError
} from "apollo-server-core";
import {
    extractToken,
    readToken,
    generateTokens
} from "./utils/authHelpers";
import {
    genSalt,
    hash,
    compare
} from "bcryptjs";
import to from "../../utils";
import { GraphQLError } from "graphql";

export const UserResolver = {
        Query: {
            himself: async(_,$, context) => await readToken(await extractToken(context), context.secret)
            //himself: async(...[, , ], context) => await extractToken(await readToken(context))
    },

    Mutation: {
        pushUtilisateur: async(_,args) => {

            const {
                promoId,
                motDePasse,
                role
            } = args;

            let err, user, salt, hashedPassword;



            [err, salt] = await to(genSalt(10));
            [err, hashedPassword] = await to(hash(motDePasse, salt));

            const newUser = new Utilisateurs({
                // id: mongoObjectId(),
                motDePasse: hashedPassword,
                promoId: promoId,
                role: role
            });

            [err, user] = await to(newUser.save());
            
            if (err) throw new GraphQLError({
                err
            })

            return user;

        },

        loginUser: async (root, args, context) => {


            const {
                motDePasse
            } = args;
            let err, users;

            
            [err, users] = await to(Utilisateurs.find());
            if (err) throw new GraphQLError({databaseError:err});
            if (users.length <1) throw new GraphQLError( {databaseError:  "aucun Utilisateur"}) ;
            console.log(motDePasse)
            let user = users.find((element) => compare(motDePasse,element.motDePasse))
            console.log(user)
            var [legitToken, refreshToken] = await generateTokens(user);


            return {
                user: user,
                token : legitToken,
                refreshToken,                
            };

        },

        logoutUser: async (root, args, context) => true



    },

    Subscription: {}
}