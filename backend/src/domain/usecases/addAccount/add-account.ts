import { ProductModel} from "../../models/product";

export interface AddAccountModel {
  name: string;
  price: number;
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<ProductModel>;
}
