"use strict";
import { Model } from "sequelize";

interface IProduct {
  id: number;
  name: string;
  price: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class product extends Model<IProduct> implements IProduct {
    id!: number;
    name!: string;
    price!: number;
    static associate(models: any) {}
  }
  product.init(
    {
      id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
