import { ProductPutController } from "../../presentation/controllers/product/product-put";
import { Controller } from "../../presentation/protocols";

export const makeProductPutController = (): Controller =>{
    return new ProductPutController();
}