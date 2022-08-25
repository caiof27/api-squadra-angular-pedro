import { badRequest, serverError, ok } from "../../helpers/http-helper";
import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "./signup-protocols";
import { MissingParamError } from "../../errors/index";
import { AddAccount } from "../../../domain/usecases/addAccount/add-account";

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount;

  constructor( addAccount: AddAccount) {
    this.addAccount = addAccount;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requireFields = [
        "name",
        "price",
      ];

      for (const field of requireFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, price } = httpRequest.body;
    
      const account = await this.addAccount.add({
        name,
        price,
      });
      return ok(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
