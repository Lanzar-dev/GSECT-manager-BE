import { Subscription } from "../model/subscriptionModel.js";

export const subscriptionController = {
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
        status: "success",
        message: "successful",
        data: subscription,
        documentCount: docCount,
        totalPages: Math.ceil(docCount / PAGE_SIZE),
        nextPage:
          Math.ceil(docCount / PAGE_SIZE) > page ? `/${page + 1}` : null,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "fail", message: "server err", err });
    }
  },

  getSubscriptionById: async (req, res) => {
    const { id } = req.params;
    try {
      const subscription = await Subscription.findById(id);
      return res
        .status(201)
        .json({ status: "success", message: "successful", data: subscription });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "fail", message: "server err", err });
    }
  },

  createSubscription: async (req, res) => {
    const {
      category,
      subPlan,
      subType,
      autoRenew,
      status,
      price,
      billingCycle,
      remindMe,
    } = req.body;

    try {
      if (
        !category ||
        !subPlan ||
        !subType ||
        !autoRenew ||
        !status ||
        !price ||
        !billingCycle ||
        !remindMe
      ) {
        return res
          .status(400)
          .json({ status: "fail", message: "Please fill all fields" });
      }

      const newSubscription = new Subscription(req.body);
      const subscription = await newSubscription.save();
      if (!subscription) {
        return res
          .status(400)
          .json({ status: "fail", message: "something went wrong" });
      }
      return res.status(200).json({
        status: "success",
        message: "successful",
        data: {
          category,
          subPlan,
          subType,
          autoRenew,
          status,
          price,
          nextBill,
          billingCycle,
          remindMe,
        },
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "fail", message: "server err", err });
    }
  },

  editSubscriptionById: async (req, res) => {
    const { id: _id } = req.params;

    // Check if there's at least one information to update
    if (
      ![
        req.body.category,
        req.body.subPlan,
        req.body.subType,
        req.body.autoRenew,
        req.body.status,
        req.body.price,
        req.body.nextBill,
        req.body.billingCycle,
        req.body.remindMe,
        req.body.endDate,
      ].some(Boolean)
    ) {
      return res.status(400).json({
        status: "Failed",
        message: "All fields must be filled",
      });
    }

    try {
      // Update category details in db
      const updatedSubscription = await Subscription.findByIdAndUpdate(
        { _id },
        req.body,
        { new: true }
      );

      return res.status(200).json({
        status: "Success",
        message: "Subscription sucessfully updated",
        data: updatedSubscription,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  deleteSubscription: async (req, res) => {
    const { id } = req.params;

    try {
      const savedSubscriptionk = await Product.findByIdAndRemove(id);

      return res.status(200).json({ message: "Subscription deleted" });
    } catch (error) {
      return res.status(400).json((error.reason = { message: "id not found" }));
    }
  },
};
