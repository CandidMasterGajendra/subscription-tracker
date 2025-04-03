import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100
    },

    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'price must be greater than 0']
    }, 

    currency : {
        type: String, 
        enum: ['USD', 'EUR', 'GBP', 'INR'],
        default: 'USD'
    },
    
    frequency: {
        type: String, 
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },

    // to know where we are spening the most
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true
    },

    paymentMethod: {
        type: String,
        trim: true,
        required: true
    },

    Status: {
        type: String, 
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    }
    ,

    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => {
                value <= new Date();
            },

            message: 'start date must be in the past'
        }
    },

    renewalDate: {
        type: Date,
        validate: {
            validator: function check(value){
                return value > this.startDate;
            },

            message: 'renewal date must be after the start date'
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true      // optimize the user queries by indexing the user fields
    }
    
}, {timestamps: true});

SubscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.setDate() + renewalPeriods[this.frequency]);
    }

    // Auto update the status if renewal date is passed
    if(this.renewalDate < new Date()) {
        this.Status = 'expired';
    }

    next();
});

// Auto calculate the renewal date if missing
const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;