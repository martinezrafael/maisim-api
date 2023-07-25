const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Top10 extends Model {}

Top10.init(
  {
    BRICK: DataTypes.INTEGER,
    SETOR_NEC_ABERTO: DataTypes.STRING(200),
    EAN: DataTypes.STRING(15),
    CEP_INICIAL: DataTypes.INTEGER,
    CEP_FINAL: DataTypes.INTEGER,
    PRODUTO: DataTypes.STRING(66),
    LABORATORIO: DataTypes.STRING(50),
    UNIDADES: DataTypes.FLOAT,
    FCC: DataTypes.INTEGER,
    RANK: DataTypes.INTEGER,
    REPRESENTACAO: DataTypes.FLOAT,
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
