import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const TowerSchema = new Schema({
    creatorId: {type: ObjectId, required: true, ref: 'Account'},
    name: {type: String, required: true},
    description: {type: String, required: true},
    coverImg: {type: String, required: true},
    location: {type: String, required: true},
    capacity: {type: Number, required: true, minlength: 20},
    startDate: {type: Date, required: true },
    isCanceled: {type: Boolean, default: false},
    type: {type: String, enum: ['concert', 'sport', 'convention', 'digital' ], required: true}
},{timestamps: true, toJSON: {virtuals: true}})


TowerSchema.virtual('creator',{
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})
