import { ProductGetOneController } from "../../presentation/controllers/product/product-getOne";
import { Controller } from "../../presentation/protocols";

export const makeProductGetOneController = (): Controller =>{
    return new ProductGetOneController();
}