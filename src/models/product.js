const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return product.init(sequelize, DataTypes);
}


/**
 * @openapi
 * components:
 *   schemas:
 *     product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: tv 20 pulgadas marca Lg
 *         price:
 *           type: int
 *           example: 123
 *         availableQty:
 *           type: int
 *           example: 12
 *         type:
 *           type: enum (pending - incart- purchased)
 *           example: pending
 *         userId:
 *           type: int
 *           example: 1234
 *     allproducts:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: tv 20 pulgadas marca Lg
 *         price:
 *           type: int
 *           example: 123
 *         availableQty:
 *           type: int
 *           example: 12
 *         type:
 *           type: enum (pending - incart- purchased)
 *           example: pending
 *         userId:
 *           type: int
 *           example: 1234
 */ 






class product extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "product_name_key"
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    available_qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM("pending","incart","purchased"),
      allowNull: true,
      defaultValue: "pending"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "product_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "product_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
