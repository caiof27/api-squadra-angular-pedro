import { AddAccountRepository } from "../../../../data/protocols/addAccountRepository";
import { ProductModel } from "../../../../domain/models/product";
import { AddAccountModel } from "../../../../domain/usecases/addAccount/add-account";
import Account from "../models";


export class AccountPostgresRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<ProductModel> {
    const result = await Account.Create(accountData);
    return result;
  }
}
