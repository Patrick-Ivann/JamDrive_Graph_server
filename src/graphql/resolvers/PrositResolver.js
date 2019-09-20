import prosit from "../../mongoDB/Prosit";
import Prosits from "../../mongoDB/Prosit";
import {
    GraphQLError
} from "graphql";
import to from "../../utils";

export const PrositResolver = {

    Query: {
        prosits: async (root, args, context) => await Prosits.find(),

        prositById: async (root, args, context) => await Prosits.findById(args.id),

        prositByPromo: async (root, args, context) => await Prosit.find({
            promo: args.id
        })


    },


    Mutation: {

        pushProsit: async (root, args, context) => {
            const prositChamps = {};
            let err;

            for (var key in args) {

                prositChamps[key] = args[key]

                if (typeof args.motsClef !== 'undefined') prositChamps.motsClef = args.motsClef.toString().split(",")
            }


            [err, user] = await to(readToken(await extractToken(context), context.secret))

            prositChamps['promo'] = user.user.promo
            user.user.id = user.user._id

            let exisitingProsit;
            [err, exisitingProsit] = await to(
                Prosits.findOne({
                    "nomProsit": args.nomProsit

                })
            )
            if (exisitingProsit) GraphQLError("Ce prosit existe déjà")
            if (err) GraphQLError(err)

            let newProsit;
            [err, newProsit] = await to(new Prosits(prositChamps).save())
            if (err) return GraphQLError(err)

            return newProsit
        },
        popProsit:async(root,args,context) => {
            let err, newProsit;
            if(mongoose.Types.ObjectId.isValid(args.id)) return false

            [err, newProsit] = await to(Prosits.findByIdAndRemove(args.id))
            if (err)  GraphQLError(err)

            return true
        }
    }
}