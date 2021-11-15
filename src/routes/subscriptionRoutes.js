import express from "express";
import { subscriptionController } from "../controllers/SubscriptionController.js";

import { isAuth } from "../middleware/auth.js";
const router = express.Router();

router
  .route("/subscription")
  .get(isAuth, subscriptionController.getAllSubscription)
  .put(isAuth, subscriptionController.createSubscription);

router
  .route("/subscription/:id")
  .get(isAuth, subscriptionController.getSubscriptionById)
  .patch(isAuth, subscriptionController.editSubscriptionById)
  .delete(isAuth, subscriptionController.deleteSubscription);

export default router;
