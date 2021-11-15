import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const historySchema = new Schema(
  {
    subscription: {
      type: SchemaTypes.ObjectId,
      ref: 'subscription',
      required: true,
    }
  },
  { timestamps: true } 

)
export const History = model('history', historySchema);