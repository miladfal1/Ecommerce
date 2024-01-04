const express = require("express");
const { productDetail , productList} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", productList);
router.get("/:productId", productDetail); // TODO: in bayad dorost bshe routeresh ba balayi jam bshe

module.exports = router;
