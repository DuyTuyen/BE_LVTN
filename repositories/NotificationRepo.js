const notification = require("../models/NotificationModel")
const GetNotificationConsignmentAggregate = require("../aggregate/GetNotificationConsignmentAggregate");
const { default: mongoose } = require("mongoose");
const GetNotificationOrderAggregate = require("../aggregate/GetNotificationOrderAggregate");

const create = ({ type, content, r_order, r_consignment }, session) => {
    return notification.create([{ type, content, r_order, r_consignment }], { session })
}

const getByOrderIdAndType = ({r_order, type}) => {
    return notification.findOne({r_order,type})
}

const getAllByConsignment = () => {
    const myAggregate = GetNotificationConsignmentAggregate()
    return notification.aggregate(myAggregate)
}

const getAllByOrder = (userId) => {
    const myAggregate = GetNotificationOrderAggregate(userId)
    return notification.aggregate(myAggregate)
}
const updateIsRead = (id, session) => {
    return notification.findOneAndUpdate({_id:id},{isRead: true,updatedAt: Date.now()})
}
module.exports = { create, getAllByConsignment,getByOrderIdAndType, updateIsRead, getAllByOrder }
