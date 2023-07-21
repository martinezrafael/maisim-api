const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Geral extends Model {}

Geral.init(
  {
    BRICK: {
      type: DataTypes.INTEGER,
      field: "BRICK",
    },
    SETOR_NEC_ABERTO: {
      type: DataTypes.STRING(200),
      field: "SETOR_NEC_ABERTO",
    },
    EAN: {
      type: DataTypes.STRING(15),
      field: "EAN",
    },
    CEP_INICIAL: {
      type: DataTypes.INTEGER,
      field: "CEP_INICIAL",
    },
    CEP_FINAL: {
      type: DataTypes.INTEGER,
      field: "CEP_FINAL",
    },
    PRODUTO: {
      type: DataTypes.STRING(66),
      field: "PRODUTO",
    },
    LABORATORIO: {
      type: DataTypes.STRING(50),
      field: "LABORATORIO",
    },
    UNIDADES: {
      type: DataTypes.FLOAT,
      field: "UNIDADES",
    },
    FCC: {
      type: DataTypes.INTEGER,
      field: "FCC",
    },
    RANK: {
      type: DataTypes.INTEGER,
      field: "RANK",
    },
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
