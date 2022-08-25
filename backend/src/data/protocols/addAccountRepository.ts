import { ProductModel } from "../../domain/models/product";
import { AddAccountModel } from "../../domain/usecases/addAccount/add-account";

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<ProductModel>;
}
