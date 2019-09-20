const Schema = mongoose.Schema;

const RessourcesSchema = new Schema({
    
        nomRessource: {
            type: String
        },
        urlRessource: {
            type: String,
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

RessourcesSchema.virtual('id').get('nomShort', () => {this.nomProsit.split("_")[2];});

RessourcesSchema.plugin(mongooseLeanVirtuals);

const ressources = mongoose.model('ressources', RessourcesSchema);
export default ressources