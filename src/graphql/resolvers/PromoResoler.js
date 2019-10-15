import Promos from "../../mongoDB/Promo";
import to from "../../utils";
import {
    GraphQLError
} from "graphql";

export const PromoResolver = {
    Query: {
        promos: async (root, args, context) => await Promos.find().lean(),
        promo: async (root, args, context) => await Promos.find().lean(),

        promoById: async (root, args, context) => await Promos.findById(args.id).lean(),

    },



    Mutation: {

        pushPromo: async (root, args) => {
            const {
                promo
            } = args;
            let err, returnedPromo;
            const newPromo = new Promos({
                promo: promo
            });
            [err, returnedPromo] = await to(newPromo.save());
            if (err) return GraphQLError({err})
            return returnedPromo;
        }
    }
}