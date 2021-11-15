import { Subscription } from '../model/subcriptionModel.js';

    export const HistoryController = {
    getAllSubscription: async (req, res) => {
    const PAGE_SIZE = 20;
    let page = 1;
    let skip;

    if (req.query.page) {
    page = Number(req.query.page);
    skip = (page - 1) * PAGE_SIZE;
    }

    try {
    const subscription = await Subscription.find({}).populate().lean().exec();
    const docCount = await Subscription.find({}).countDocuments();
    return res.status(201).json({
        status: 'success',
        message: 'successful',
        data: subscription,
        documentCount: docCount,
        totalPages: Math.ceil(docCount / PAGE_SIZE),
        nextPage:
        Math.ceil(docCount / PAGE_SIZE) > page ? `/${page + 1}` : null,
    });
    } catch (err) {
    return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
},

getSubscriptionById: async (req, res) => {
    const { id } = req.params;
    try {
    const subscription = await Subscription.findById(id)
    return res
        .status(201)
        .json({ status: 'success', message: 'successful', data: subscription });
    } catch (err) {
    return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
},


}