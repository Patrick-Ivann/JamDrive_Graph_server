const {
    MongoClient
} = require('mongodb');

// 1
const MONGO_URL = 'mongodb://flawn:jampops2018@ds135844.mlab.com:35844/jamdrive';

// 2
module.exports = async () => {
    const client = await MongoClient.connect(MONGO_URL, {
        useNewUrlParser: true,
        poolSize: 20,
        socketTimeoutMS: 480000,
        keepAlive: 300000,

    });
        let db = await client.db();

    return {
        Prosits: db.collection("prosits"),
        Utilisateurs: db.collection("utilisateurs")

    };
}