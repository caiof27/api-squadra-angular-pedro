import { badRequest, serverError, ok } from "../../helpers/http-helper";

import { MissingParamError, InvalidParamError } from "../../errors/index";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import db from "../../../infra/db/postgres/models";

export class ProductDeleteController implements Controller {
  constructor() {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

    const id = httpRequest.params["id"];

    const account = await db.product.destroy({ where: { id } });

    return ok(account);
  }
}
