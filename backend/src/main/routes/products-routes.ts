import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeProductGetController } from "../factories/product-get";

export default (router: Router): void => {
  router.post("/products",adaptRoute(makeProductGetController()));
  router.get("/products");
  router.get("/products/:id");
  router.delete("/products");
  router.put("/products");
};
