import { ProductGetController } from "../../presentation/controllers/product/product-get";
import { Controller } from "../../presentation/protocols";

export const makeProductGetController = (): Controller =>{
    return new ProductGetController();
}