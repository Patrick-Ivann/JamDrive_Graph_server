import Promos from "../../mongoDB/Promo";

export const PromoResolver = {
    Query: {
        promos: async (root, args, context) => await Promos.find(),
        promo: async (root, args, context) => await Promos.find(),

        promoById: async (root,args,context) => await Promos.findById(args.id),        

    },



    Mutation : {

        
    }
}