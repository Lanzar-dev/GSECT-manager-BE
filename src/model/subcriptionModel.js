import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;


const subscriptionSchema = new Schema(
    {
    category:{
            type: SchemaTypes.ObjectId,
            ref: 'category',
            required: [true, "please enter a subscription category"],
    },

    subPlan: {
        type: String,
        enum: ['type1', 
               'type2', 
               'type3',
               'type4'
        ],
        required: [true, "please enter a valid subscription period"],
      
    },
    subType: {
        type: String,
        enum: ['daily', 
               'weekly', 
               'monthly',
               'quarterly',
               'yearly'
        ],
        required: [true, "please enter a valid subscription period"],
    },
    autoRenew:{
        type:Boolean,
        required: [true, "please enter a auto renewal status"],

    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: [true, "please enter a valid status"],
        
    },
    price: {
        type: Number,
        required: [true, "please enter a valid price"],
    }, 
    nextBill: {
        type: Date,
        required: [true, "Please enter a billing date."],
    },
    billingCycle:{
        type: Number,
        required: [true, "Please enter a billing cycle."],
    },
    remindMe:{
        type:Boolean,
        defualt: false,
    },
    remindMeDate:{
        type: Date,
        default:this.nextBill,
    },
    endDate: {
        type: Date,
        required: [true, "Please enter a valid end time"],
    }
    }, { timestamps: true }
    )

export const Subscription = model('subscription', subscriptionSchema);
