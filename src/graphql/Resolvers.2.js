const {
    PubSub,
} = require('graphql-subscriptions');

const pubsub = new PubSub();
const NOTIFICATION_SUBSCRIPTION_TOPIC = 'newProsit';
const prosits = [{
        "_id": "5c980db3b5c99c1dd1c5ee63",
        "id": 0,
        "validation": null,
        "motsClef": ["frottement", "calculs", "physique", "force", "statique", "dynamique", "newton", "pente", "vecteurs"],
        "unite": "4-mécanique",
        "nomProsit": "16_Prosit_PFD",
        "nomScribe": "le mec",
        "promo": "2017-2022",
        "dateUpload": "2019-03-24T23:07:31.836Z",
        "ressources": [],
        "__v": 0,
        "aller": "/home/ivann/JamDrive/fichiers/16_Prosit_PFD_aller5c980db3b5c99c1dd1c5ee63.docx",
        "retour": "/home/ivann/JamDrive/fichiers/16_Prosit_PFD_retour5c980db3b5c99c1dd1c5ee63.docx"
    },

    {
        "_id": "5c98111eb695421fdd5d92ad",
        "id": 1,
        "validation": null,
        "motsClef": ["Energie", " physique", "calculs", "pente"],
        "unite": "4-mécanique",
        "nomProsit": "17_Prosit_Energie",
        "nomScribe": "le mec",
        "promo": "2017-2022",
        "dateUpload": "2019-03-24T23:22:06.925Z",
        "ressources": [],
        "__v": 0,
        "aller": "/home/ivann/JamDrive/fichiers/17_Prosit_Energie_ALLER5c98111eb695421fdd5d92ad.docx",
        "retour": "/home/ivann/JamDrive/fichiers/17_Prosit_Energie_RETOUR5c98111eb695421fdd5d92ad.docx"
    },

    {
        "_id": "5c9b339a2763ee20863b563c",
        "id": 2,
        "validation": null,
        "motsClef": ["PHP", "AJAX", "WEB", "backend", "serveur", "json", "cookies"],
        "unite": "3-web",
        "nomProsit": "11_Prosit_PHP",
        "nomScribe": "le mec",
        "promo": "2017-2022",
        "dateUpload": "2019-03-27T08:26:02.773Z",
        "ressources": [],
        "__v": 0,
        "aller": "/home/ivann/JamDrive/fichiers/11_Prosit_PHP_aller5c9b339a2763ee20863b563c.docx",
        "retour": "/home/ivann/JamDrive/fichiers/11_Prosit_PHP_retour5c9b339a2763ee20863b563c.docx"
    },


    {
        "_id": "5c9b4ec4dc312540e1727eb2",
        "id": 3,
        "validation": null,
        "motsClef": ["OBS", "PBS", "WBS", "PERT", "GANTT"],
        "unite": "3-web",
        "nomProsit": "15_Prosit_GestionDeProjet",
        "nomScribe": "Tomtom",
        "promo": "2017-2022",
        "dateUpload": "2019-03-27T10:21:56.170Z",
        "ressources": [],
        "__v": 0,
        "aller": "/home/ivann/JamDrive/fichiers/15_Prosit_GestionDeProjet_aller5c9b4ec4dc312540e1727eb2.docx",
        "retour": "/home/ivann/JamDrive/fichiers/15_Prosit_GestionDeProjet_retour5c9b4ec4dc312540e1727eb2.docx"
    }





];

// GraphQL: Resolvers
const RESOLVERS = {
    Query: {
        prosits: () => prosits,
    },

    Mutation: {
        pushProsit: (root, args) => {
            const newProsit = {
                validation: null,
                id: prosits.length + 1,
                motsClef: null,
                unite: args.unite,
                nomProsit: args.nomProsit,
                promo: args.promo,


            };
            // var prositIdentique = prosits.find(prosit => (prosit.nomProsit === newProsit.nomProsit) && (prosit.promo === newProsit.promo))

            // prositIdentique ? (prosits.push(newProsit), pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, {
            //     prosits,
            // })) : console.log("object");

            prosits.push(newProsit), pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, {
                prosits,
            })



            return newProsit;
        },


        popProsit: (root, args) => {

            prosits.splice(args.id - 1, 1)

            pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, {
                prosits,
            });


            return prosits;

        },

        updateProsit: (root, args) => {

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
            let _id = args._id
            delete args._id
            return {
                success: prosits.upsert(_id, { $set: args }, (error, response) => {
                    if (response) {
                        args._id = _id
                        pubsub.publish('prositUpdated', args)
                    }
                })
            }

        }
    },

    Subscription: {
        newProsits: {
            subscribe: () => pubsub.asyncIterator(NOTIFICATION_SUBSCRIPTION_TOPIC),
        },
        prositDelete:{

        },
         prositDeleted(_id) {
            return _id;
        },
        prositUpdated(prosit) {
            return prosit;
        },
    },

};
// Exports
export default RESOLVERS;