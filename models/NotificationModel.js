const mongoose = require('mongoose')
const abstractModel = require('./AbstractModel')
const NOTIFICATIONSTATUS = require("../enums/NotificationType")

const notificationSchema = new mongoose.Schema({
    ...abstractModel,
    isRead: {
        type: Boolean,
        default: false
    },
    content: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: Object.values(NOTIFICATIONSTATUS).map(v => v),
        default: 'other'
    },
    r_consignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'consignment'
    },
    r_order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }
})

const notification = mongoose.model("notification", notificationSchema)

module.exports = notification