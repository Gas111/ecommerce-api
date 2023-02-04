const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return car.init(sequelize, DataTypes);
}


/**
 * @openapi
 * components:
 *   schemas:
 *     car:
 *       type: object
 *       properties:
 *         userId:
 *           type: int
 *           example: 1
 *         quantity:
 *           type: int
 *           example: 3
 */ 


class car extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'car',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "car_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
