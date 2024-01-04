const db = require("../db");
const bc = require("bcrypt");
const { createToken } = require("../utils");
const e = require("express");


//// route productList :  localhost:3000/products
exports.productList = async (req , res, next) => {
  try {
    const products = await db.product.findMany({});
    //////////////////////////////////////////////////////////////////////  baraye har record esme kala miad va jame nmishe 1 bar esme mahsol biad va kamel attribute ha
    return res.json({
      products,
    });

  } catch (error) {
     next(error);
  }
}



// Route : localhost:3000/products/:productId
exports.productDetail = async (req ,res, next) => {
  try {
    // const {product} = req.query;
    const {productId} = req.params; // ??????????????????????????????
    // TODO: az dakhele req.query bayad be sorate slug bde va detail mishe price va ...
    const products = await db.product.findFirstOrThrow({
      include : {
        ProductPrice : true, // khdoesh mifahmde ke bayad roye productId join bzane ya na ? 
        // TODO: bayad be category ham join bzanim ta detail behtari namayesh dade shavad va inke inja bayad where zade beshe 
      }
    })
    // const specificProduct = await products.findFirstOrThrow({ where: { productId } });

    return res.json({
      specificProduct,
    });

  } catch (error) {
      next(error);
  }
}



