import * as mongoose from "mongoose";
import * as uuid from "uuid";
const AdminsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
    siteRef: {
        type: mongoose.SchemaTypes.String,
        ref: "SiteWingsForWorldSettings"
    },
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    passwordSalt: String,
    status: {
        type: String,
        default: "admin"
    },
    jwt: String,
    orders: [{
        orderId: {
            type: String,
            required: true,
            default: uuid.v4
        },
        timestamp: {
            type: Date,
            required: true,
            default: Date.now
        },
        service: {
            type: String,
            required: true,
            enum: [
                "Air ticketing and reservation",
                "Travel insurance",
                "Visa assist",
                "Consular services",
                "World wide hotel booking",
                "Incentive group travel",
                "Honeymoon packages",
                "Family packages",
                "Holiday packages",
                "Pilgrimage packages"
            ]
        },

        first_name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
        },
        last_name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
        },
        phone: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        adult_num: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        child_num: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        infant_num: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        remarks: {
            type: String,
            maxlength: 1000,
            default: "-"
        },
        email: {
            type: String,
            required: true,
            match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        destination: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
        },
        dep_date: {
            type: String
        },
        arrive_date: {
            type: String
        },
        class: {
            type: String,
            default: "First",
            enum: ["First", "Econom", "Business"]
        }
    }],
    counterOfOrders: {
        type: Number,
        default: 0
    },
    ordersCount: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ["E", "O"]
    },
    webSoketId: String
}, {
   timestamps: true,
   bufferCommands: false
});
export const AdminModel = mongoose.model("Admin", AdminsSchema);