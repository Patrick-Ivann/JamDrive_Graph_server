/* var MongoClient = require('mongodb').MongoClient

var state = {
    db: null,
}

export const connect = function (url, done) {
    if (state.db) return done()

    MongoClient.connect(url, function (err, db) {
        if (err) return done(err)
        state.db = db
        
        done()
    })
}

export const get = function () {
    return state.db
}

export const close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
} */



const MongoClient = require('mongodb').MongoClient

class Connection {
    static connectToMongo() {
        if (this.db) return Promise.resolve(this.db)
        return MongoClient.connect(this.url, this.options)
            .then(db => {
                this.db = db})
    }
}

Connection.db = null
Connection.url = 'mongodb://flawn:jampops2018@ds135844.mlab.com:35844/jamdrive'
Connection.options = {
 useNewUrlParser: true,
     poolSize: 20,
     socketTimeoutMS: 480000,
     keepAlive: 300000,

}

module.exports = {
    Connection
}