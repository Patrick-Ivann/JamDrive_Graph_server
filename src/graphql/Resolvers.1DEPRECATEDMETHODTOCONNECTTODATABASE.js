import mongo from 'mongodb';


const {
    PubSub,
} = require('graphql-subscriptions');




const pubsub = new PubSub();
const NOTIFICATION_SUBSCRIPTION_TOPIC = 'newProsit';



const prepare = (o) => {
    o._id = o._id.toString()
    return o
}

// GraphQL: Resolvers
const RESOLVERS = {
    Query: {
        prosits: async (root, args, context) => {

            const {
                Prosits
            } = context.database;





            //    return await Prosits.find({}).toArray(); // 2

            return new Promise((resolve, reject) => {

                Prosits.find().toArray((err, document) => {
                    err ? reject(err) : (resolve(document))
                })

                /* Prosits.find({})((err, res) => {
                    err ? reject(err) : (resolve(res)

                    )
                })*/


            })
        },
    },

    Mutation: {
        pushProsit: (root, args, context) => {


            const {
                Prosits
            } = context.database;

            console.log(args.nomProsit)




            // };
            // // var prositIdentique = prosits.find(prosit => (prosit.nomProsit === newProsit.nomProsit) && (prosit.promo === newProsit.promo))

            // // prositIdentique ? (prosits.push(newProsit), pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, {
            // //     prosits,
            // // })) : console.log("object");

            // prosits.push(newProsit), pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, {
            //     prosits,
            // })



            // return newProsit;



            // return prosits.insert(args, (error, response) => {
            //     if (response) {
            //         args._id = response
            //         pubsub.publish('postInserted', args)
            //     }
            // })

            /* const newProsit = new Prosit({
                 validation: null,
                 motsClef: null,
                 unite: args.unite,
                 nomProsit: args.nomProsit,
                 promo: args.promo,
             })*/


            const newProsit = {
                validation: null,
                motsClef: null,
                unite: args.unite,
                nomProsit: args.nomProsit,
                promo: args.promo,
            }

            return new Promise((resolve, reject) => {
                Prosits.insertOne(newProsit,(err, res) => {
                    err ? reject(err) : (resolve(res["ops"][0]), Prosits.find().toArray((err, res) => {
 pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, {
                        "newProsit": res,
                    });
                }))
                });
            });




        },


        popProsit: async (root, args, context) => {


            const {
                Prosits
            } = context.database;

            var objectId = new mongo.ObjectID(args._id)



            return new Promise((resolve, reject) => {
                Prosits.deleteOne({"_id": objectId},(err, res) => {
                    err ? reject(err) : (
                        resolve(objectId),
                        Prosits.find().toArray((err, res) => {

                        pubsub.publish('prositDeleted', {
                            prositDeleted: res 
                        })

                    })
                    );
                });
            });

            /*
            prosits.splice(args.id - 1, 1)

            pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, {
                prosits,
            });


            return prosits;*/

            // return {
            //     success: Prosits.remove(args, (error, response) => {
            //         if (response) {
            //             pubsub.publish('prositDeleted', args._id)
            //         }
            //     })
            // }





        },

        updateProsit: (root, args, context) => {

            const {
                Prosits
            } = context.database;

var objectId = new mongo.ObjectID(args._id)

            /*
            prosits.map(prosit => {
                if (prosit.id === args.id) {

                    args.validation ? validation = args.validation : null,
                        args.motsClef ? motsClef = args.motsClef : null, w
                    args.unite ? unite : args.unite


                    return prosit;
                }
            });
            return prosits.filter(prosit => prosit.id === id)[0];

            */
            // let _id = args._id
            // delete args._id
            // return {
            //     success: prosits.upsert(_id, {
            //         $set: args
            //     }, (error, response) => {
            //         if (response) {
            //             args._id = _id
            //             pubsub.publish('prositUpdated', args)
            //         }
            //     })
            // }

            return new Promise((resolve, reject) => {
                Prosits.findOne({
                            "_id": objectId
                        }, (err, toUpdate) => {


                    args.validation ? validation = args.validation : validation = toUpdate.validation,

                        args.motsClef ? motsClef = args.motsClef : validation = toUpdate.motsClef,

                        args.unite ? unite = args.unite : validation = toUpdate.unite


                    Prosits.findOneAndUpdate({
                            
                                "_id": objectId
                            

                        }, {
                            $set: {
                                validation,
                                motsClef,
                                unite

                            }
                        }, {
                            new: true
                        },
                        (err, res) => {
                            err ? reject(err) : (resolve(res), pubsub.publish('prositUpdated', res));
                        }
                    );
                });

            })
        }
    },

    Subscription: {
        newProsit: {
            subscribe: () => pubsub.asyncIterator("newProsit"),
        },

      prositDeleted: {
          subscribe: () => pubsub.asyncIterator("prositDeleted"),
      },
        prositUpdated(prosit) {
            return prosit;
        },
    },

};
// Exports
export default RESOLVERS;