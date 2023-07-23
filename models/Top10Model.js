const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Top10 extends Model {}

Top10.init(
  {
    brick: {
      type: DataTypes.INTEGER,
      field: "BRICK",
    },
    setorNecAberto: {
      type: DataTypes.STRING(200),
      field: "SETOR_NEC_ABERTO",
    },
    ean: {
      type: DataTypes.STRING(15),
      field: "EAN",
    },
    cepInicial: {
      type: DataTypes.INTEGER,
      field: "CEP_INICIAL",
    },
    cepFinal: {
      type: DataTypes.INTEGER,
      field: "CEP_FINAL",
    },
    produto: {
      type: DataTypes.STRING(66),
      field: "PRODUTO",
    },
    laboratorio: {
      type: DataTypes.STRING(50),
      field: "LABORATORIO",
    },
    unidades: {
      type: DataTypes.FLOAT,
      field: "UNIDADES",
    },
    fcc: {
      type: DataTypes.INTEGER,
      field: "FCC",
    },
    rank: {
      type: DataTypes.INTEGER,
      field: "RANK",
    },
  },
  {
    sequelize,
    modelName: "Top10",
    tableName: "TOP_10",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Top10;
