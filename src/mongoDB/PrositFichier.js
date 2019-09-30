const Schema = mongoose.Schema;

const PrositFichierSchema = new Schema({

    title: {
        type: String
    },
    path: {
        type: String,
    },
    filename: {
        type: String,
    },

    mimetype: {
        type: String,
    },
    encoding: {
        type: String,
    },

    typeFichier: {
        type: String
    },
    prositId: "String",
    promoId: "String"


}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
});

PrositFichierSchema.set('toJSON', {
    virtuals: true
});


PrositFichierSchema.plugin(mongooseLeanVirtuals);

const Fichiers = mongoose.model('Fichiers', PrositFichierSchema);
export default Fichiers