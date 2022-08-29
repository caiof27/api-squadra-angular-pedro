import { badRequest, serverError, ok } from "../../helpers/http-helper";

import { MissingParamError, InvalidParamError } from "../../errors/index";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import db from "../../../infra/db/postgres/models";

export class ProductPutController implements Controller {
  constructor() {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requireFields = ["id","name", "price"];

    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    const { id, name, price } = httpRequest.body;

    let account;

    await db.product
      .update({
        name,
        price,
      },{where:{id: id}})

    return ok(account);
  }
}
