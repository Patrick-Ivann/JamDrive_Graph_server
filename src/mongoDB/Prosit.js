const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');


const Schema = mongoose.Schema;

const PrositSchema = new Schema({
    nomProsit: {
        type: String,
        required: true,
        unique: true

    },

    unite: {
        type: String,
        required: true
    },

    validation: {
        type: Number,
        default: 0,
    },

    type: {
        type: Boolean,
    },
    
    nomScribe: {
        type: String,
        required: true
    },
    
    annee: {
        type: String,
        required: true
    },

    motsClef: {
        type: [String],
    },

    promoId: {type :"String"}

   
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    nomShort: { virtuals: true }
});

PrositSchema.set('toJSON', {
    virtuals: true
});

PrositSchema.set('nomShort', {
    virtuals: true
    // this.nomProsit.split("_")[2];
});

PrositSchema.plugin(mongooseLeanVirtuals);

const Prosits = mongoose.model('Prosits', PrositSchema);
export default Prosits