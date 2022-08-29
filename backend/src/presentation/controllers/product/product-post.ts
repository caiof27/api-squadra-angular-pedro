import { badRequest, serverError, ok } from "../../helpers/http-helper";

import { MissingParamError, InvalidParamError } from "../../errors/index";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import db from "../../../infra/db/postgres/models";

export class ProductPostController implements Controller {
  constructor() {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requireFields = ["name", "price"];

    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    const { name, price } = httpRequest.body;

    let account;

    db.product
      .create({
        name,
        price,
      })
      .then(
        async (result: { id: any }) =>
          (account = await db.product.findByPk(result.id))
      );

    return ok(account);
  }
}
