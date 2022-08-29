import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeProductDeleteController } from "../factories/product-delete";
import { makeProductPostController } from "../factories/product-post";
import { makeProductPutController } from "../factories/product-put";

export default (router: Router): void => {
  router.post("/products",adaptRoute(makeProductPostController()));
  router.get("/products");
  router.get("/products/:id");
  router.delete("/products",adaptRoute(makeProductDeleteController()));
  router.put("/products",adaptRoute(makeProductPutController()));
};
