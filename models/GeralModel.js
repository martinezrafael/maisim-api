const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Geral extends Model {}

Geral.init(
  {
    BRICK: DataTypes.INTEGER,
    SETOR_NEC_ABERTO: {
      type: DataTypes.STRING(200),
      indexes: [{ fields: ["SETOR_NEC_ABERTO"] }],
    },
    EAN: DataTypes.STRING(15),
    CEP_INICIAL: {
      type: DataTypes.INTEGER,
      indexes: [{ fields: ["CEP_INICIAL"] }],
    },
    CEP_FINAL: {
      type: DataTypes.INTEGER,
      indexes: [{ fields: ["CEP_FINAL"] }],
    },
    PRODUTO: DataTypes.STRING(66),
    LABORATORIO: DataTypes.STRING(50),
    UNIDADES: DataTypes.FLOAT,
    FCC: DataTypes.INTEGER,
    RANK: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Geral",
    tableName: "RANK_GERAL",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Geral;
