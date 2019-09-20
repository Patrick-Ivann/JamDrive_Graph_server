const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const Schema = mongoose.Schema;

const PromoSchema = new Schema({


    promo: {
        type: String,
        required: true,
        unique: true
    },

    debutValiditie: {
        type: Date,
        required: true,
        default: Date.now

    },

    finValidite: {
        type: Date,
        required: true,
        default: new Date(new Date().setFullYear(new Date().getFullYear() + 6))
    }

}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

PromoSchema.set('toJSON', {
    virtuals: true
});

PromoSchema.plugin(mongooseLeanVirtuals);

const Promos = mongoose.model('Promos', PromoSchema);
export default Promos