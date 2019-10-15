import prosit from "../../mongoDB/Prosit";
import Prosits from "../../mongoDB/Prosit";
import {
    GraphQLError
} from "graphql";
import to from "../../utils";
import {
    AuthenticationError,
    UserInputError
} from "apollo-server-core";
import {
    readToken,
    extractToken
} from "./utils/authHelpers";
import Fichiers from "../../mongoDB/PrositFichier";

export const PrositResolver = {

    Query: {
        prosits: async (root, args, context) => await Prosits.find(),

        prositById: async (root, args, context) => await Prosits.findById(args.id),

        prositsByPromo: async (root, args, context) => {
            let err, user;
            [err, user] = await to(readToken(await extractToken(context), context.secret))
            if (err) throw new AuthenticationError(err)
            return await Prosits.find({
                promoId: user.user.promoId
            })
        },
        prositsByPromoId: async (root, args, context) => await Prosits.find({
            promo: args.id
        })


    },


    Mutation: {

        pushProsit: async (root, args, context) => {
            const prositChamps = {};
            let err, user;

            for (var key in args) {

                prositChamps[key] = args[key]

                if (typeof args.motsClef !== 'undefined') prositChamps.motsClef = args.motsClef.toString().split(",")
            }


            [err, user] = await to(readToken(await extractToken(context), context.secret))

            prositChamps['promoId'] = user.user.promoId
            user.user.id = user.user._id

            let exisitingProsit;
            [err, exisitingProsit] = await to(
                Prosits.findOne({
                    "nomProsit": args.nomProsit

                })
            )
            if (exisitingProsit) throw new UserInputError("Ce prosit existe déjà")
            if (err) throw new GraphQLError({
                err
            })

            let newProsit;
            [err, newProsit] = await to(new Prosits(prositChamps).save())
            console.log(err)
            if (err) throw new GraphQLError({
                err
            })

            return newProsit
        },
        popProsit: async (root, args, context) => {
            let err, newProsit;
            if (mongoose.Types.ObjectId.isValid(args.id)) return false

            [err, newProsit] = await to(Prosits.findByIdAndRemove(args.id))
            if (err) GraphQLError({
                err
            })

            return true
        }
    },

    Prosit: {

        allerFichier: async (root, args, context) => {

            let err, prosit;
            [err, prosit] = await to(Fichiers.findOne({
                typeFichier: "aller",
                prositId: root._id
            }));
            console.log(err)
            console.log(prosit)
            if (err) GraphQLError({
                err
            })
            return prosit;
        },

        retourFichier: async (root, args, context) => {

            let err, prosit;
            [err, prosit] = await to(Fichiers.findOne({
                typeFichier: "retour",
                prositId: root._id
            }))
            if (err) throw new GraphQLError({
                err
            })

            return prosit;
        },

        ressourceEleve: async (root, args, context) => {
            let err, ressource;
            [err, ressource] = await to(Fichiers.find({
                typeFichier: "ressource_eleve",
                prositId: root._id
            }))
            if (err) throw new GraphQLError({
                err
            })
            return ressource;
        },

        ressourceProf: async (root, args, context) => {
            let err, ressource;
            [err, ressource] = await to(Fichiers.find({
                typeFichier: "ressource_prof",
                prositId: root._id
            }))
            if (err) throw new GraphQLError({
                err
            })
            return ressource;
        }

    }


}