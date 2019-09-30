const Schema = mongoose.Schema;

const RessourcesSchema = new Schema({
    
        nomRessource: {
            type: String
        },
        urlRessource: {
            type: String,
        },
        filename:{
            type:String
        },
        encoding:{
            type:String
        },
        mimetype:{
            type:String
        },
        prositId : "String",
        promoId: "String"

  
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

RessourcesSchema.set('toJSON', {
    virtuals: true
});


RessourcesSchema.plugin(mongooseLeanVirtuals);

const ressources = mongoose.model('ressources', RessourcesSchema);
export default ressources