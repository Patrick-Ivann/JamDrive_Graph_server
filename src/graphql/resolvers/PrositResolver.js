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
import {
  Mongoose
} from "mongoose";
import {
  reccursiveDeletion
} from "./utils/prositHelpers";
import {
  PubSub
} from "graphql-subscriptions";

const pubSub = new PubSub();

export const PrositResolver = {
  Query: {
    prosits: async (root, args, context) => await Prosits.find(),

    prositById: async (root, args, context) => await Prosits.findById(args.id),

    prositsByPromo: async (root, args, context) => {
      let err, user;
      [err, user] = await to(
        readToken(await extractToken(context), context.secret)
      );
      if (err) throw new AuthenticationError(err);
      return await Prosits.find({
        promoId: user.user.promoId
      });
    },
    prositsByPromoId: async (root, args, context) =>
      await Prosits.find({
        promo: args.id
      }),

    prositsByUnite: async (root, args, context) => {
      let err, user;
      [err, user] = await to(
        readToken(await extractToken(context), context.secret)
      );
      if (err) throw new AuthenticationError(err);

      return await Prosits.find({
        promoId: user.user.promoId,
        unite: args.unite
      });
    }

    // unites: async (root, args, ctx) => {
    //     // let err, rrr;
    //     // [err, rrr] = await to(Prosits.aggregate(
    //     //     [{
    //     //             $group: {
    //     //                 _id: {
    //     //                     _id: "$_id",
    //     //                     unite: "$unite",
    //     //                     nomProsit: "$nomProsit",
    //     //                     motsClef: "$motsClef",
    //     //                     validation: "$validation",
    //     //                     promoId: "$promoId",
    //     //                     createdAt: "$createdAt",
    //     //                     updatedAt:"$updatedAt"
    //     //                 },
    //     //                 nomProsit: {
    //     //                     $push: "$nomProsit"
    //     //                 },
    //     //                 __id: {
    //     //                     $push: "$_id"
    //     //                 },
    //     //                 nombreProsit: {
    //     //                     $sum: 1
    //     //                 },
    //     //             },
    //     //         },

    //     //         // {
    //     //         //     $unwind: "$_id.motsClef"
    //     //         // },

    //     //     ]
    //     // ).exec())
    //     // console.log(err)
    //     // console.log(rrr)
    //     // // console.log(Prosits.aggregate().group({'unite': 1}).exec())

    //     // // console.log(object)
    //     // return rrr

    //     let err, result;
    //     [err, result] = await to(Prosits.aggregate(
    //         [{
    //             $group: {
    //                 _id: {
    //                     unite: "$unite",
    //                 },
    //                 nomProsit: {
    //                     $push: "$nomProsit"
    //                 },
    //                 __id: {
    //                     $push: "$_id"
    //                 },
    //                 nombreProsit: {
    //                     $sum: 1
    //                 },
    //             },
    //         }, ]
    //     ).exec())
    //     console.log(err)
    //     // console.log(result)
    //     result.forEach(element => {
    //         // console.log(element._id.unite)
    //         // console.log(element.__id)
    //         element.__id.map(value => {
    //             console.log(value)
    //             console.log(Prosits.find({
    //                 '_id': {
    //                     $in: [
    //                         value

    //                     ]
    //                 }
    //             }))
    //         })

    //     });
    //     // Prosits.find({
    //     //     '_id': { $in: [
    //     //         mongoose.Types.ObjectId('4ed3ede8844f0f351100000c'),
    //     //         mongoose.Types.ObjectId('4ed3f117a844e0471100000d'),
    //     //         mongoose.Types.ObjectId('4ed3f18132f50c491100000e')
    //     //     ]}
    //     // }

    // }
  },

  Mutation: {
    pushProsit: async (root, args, context) => {
      const prositChamps = {};
      let err, user;

      for (var key in args) {
        prositChamps[key] = args[key];

        if (typeof args.motsClef !== "undefined")
          prositChamps.motsClef = args.motsClef.toString().split(",");
      }

      [err, user] = await to(
        readToken(await extractToken(context), context.secret)
      );

      prositChamps["promoId"] = user.user.promoId;
      user.user.id = user.user._id;

      let exisitingProsit;
      [err, exisitingProsit] = await to(
        Prosits.findOne({
          nomProsit: args.nomProsit
        })
      );
      if (exisitingProsit) throw new UserInputError("Ce prosit existe déjà");
      if (err)
        throw new GraphQLError({
          err
        });

      let newProsit;
      [err, newProsit] = await to(new Prosits(prositChamps).save());
      console.log(err);
      if (err)
        throw new GraphQLError({
          err
        });
      pubSub.publish("PROSIT_CREATED", {
        prositCreated: newProsit
      });

      console.log(newProsit);

      return newProsit;
    },
    popProsit: async (root, args, context) => {
      let err, newProsit;
      //if (mongoose.Types.ObjectId.isValid(args.id)) return false
      if (reccursiveDeletion(args.id)) {
        [err, newProsit] = await to(Prosits.findByIdAndRemove(args.id));
        if (err)
          throw new GraphQLError({
            err
          });
        pubSub
          .publish("PROSIT_DELETED", {
            prositDeleted: newProsit
          })
          .catch(err => {
            console.error(err);
          });
      }
      return true;
    },

    validateProsit: async (root, args, context) => {
      let err, validatedProsit;
      const update = {
        validation: true
      };

      [err, validatedProsit] = await to(Prosits.findByIdAndUpdate(args.id, update, {
        new: true
      }));

      if (err) throw new GraphQLError({
        err
      });
      console.log(validatedProsit);
      pubSub.publish("PROSIT_VALIDATED", {
        prositValidated: validatedProsit
      }).catch(err => console.error(err));
    }
  },

  Prosit: {
    allerFichier: async (root, args, context) => {
      let err, prosit;
      [err, prosit] = await to(
        Fichiers.findOne({
          typeFichier: "aller",
          prositId: root._id
        })
      );
      console.log(err);
      console.log(prosit);
      if (err)
        GraphQLError({
          err
        });
      return prosit;
    },

    retourFichier: async (root, args, context) => {
      let err, prosit;
      [err, prosit] = await to(
        Fichiers.findOne({
          typeFichier: "retour",
          prositId: root._id
        })
      );
      if (err)
        throw new GraphQLError({
          err
        });

      return prosit;
    },

    ressourceEleve: async (root, args, context) => {
      let err, ressource;
      [err, ressource] = await to(
        Fichiers.find({
          typeFichier: "ressource_eleve",
          prositId: root._id
        })
      );
      if (err)
        throw new GraphQLError({
          err
        });
      return ressource;
    },

    ressourceProf: async (root, args, context) => {
      let err, ressource;
      [err, ressource] = await to(
        Fichiers.find({
          typeFichier: "ressource_prof",
          prositId: root._id
        })
      );
      if (err)
        throw new GraphQLError({
          err
        });
      return ressource;
    }
  },

  Unite: {
    unite: async (root, args, context) => {
      let err, result;
      [err, result] = await to(
        Prosits.aggregate([{
            $group: {
              _id: {
                unite: "$unite"
              },
              nomProsit: {
                $push: "$nomProsit"
              },
              __id: {
                $push: "$_id"
              },
              nombreProsit: {
                $sum: 1
              }
            }
          }

          // {
          //     $unwind: "$_id.motsClef"
          // },
        ]).exec()
      );
      console.log(err);
      console.log(result);
    }
  },

  Subscription: {
    prositCreated: {
      subscribe: () => pubSub.asyncIterator("PROSIT_CREATED")
    },

    prositDeleted: {
      subscribe: () => pubSub.asyncIterator("PROSIT_DELETED")
    },

     prositValidated: {
      subscribe: () => pubSub.asyncIterator("PROSIT_VALIDATED")
    },
  }
};