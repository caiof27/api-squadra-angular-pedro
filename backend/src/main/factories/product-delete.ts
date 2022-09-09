import { ProductDeleteController } from "../../presentation/controllers/product/product-delete";
import { Controller } from "../../presentation/protocols";

export const makeProductDeleteController = (): Controller =>{
    return new ProductDeleteController();
}