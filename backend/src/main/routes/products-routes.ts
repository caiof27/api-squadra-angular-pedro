import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeProductDeleteController } from "../factories/product-delete";
import { makeProductGetController } from "../factories/product-get";
import { makeProductGetOneController } from "../factories/product-getOne";
import { makeProductPostController } from "../factories/product-post";
import { makeProductPutController } from "../factories/product-put";

export default (router: Router): void => {
  router.post("/products",adaptRoute(makeProductPostController()));
  router.get("/products",adaptRoute(makeProductGetController()));
  router.get("/products/:id",adaptRoute(makeProductGetOneController()));
  router.delete("/products/:id",adaptRoute(makeProductDeleteController()));
  router.put("/products/:id",adaptRoute(makeProductPutController()));
};
