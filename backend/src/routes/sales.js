import express from "express";
import salesControllers from "../controllers/salesController";

const router = express.Router();

router.route("/")
    .get(salesControllers.getAllSales)
    .post(salesControllers.insertSales)

router.route("/getSalesByCategory")
    .get(salesControllers.getSalesByCategory);

router.route("/getBestSelledProducts")
    .get(salesControllers.getMostSelledProducts)

router.route("/totalEarnings")
    .get(salesControllers.totalEarnings)

export default router;