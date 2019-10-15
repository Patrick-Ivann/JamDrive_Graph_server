const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const Schema = mongoose.Schema;

const UtilisateurSchema = new Schema({
    motDePasse: {
        type: String,
        required: true,
        unique: true
    },

    promoId: {
        type: String,
        required: true,
        unique: true
    },

    role:{
        type: String,
        required: true,
    }

    

}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

UtilisateurSchema.set('toJSON', {
    virtuals: true
});

UtilisateurSchema.plugin(mongooseLeanVirtuals);

const Utilisateurs = mongoose.model('Utilisateurs', UtilisateurSchema);
export default Utilisateurs