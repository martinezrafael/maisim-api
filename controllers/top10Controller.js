const express = require("express");
const Top10Model = require("../models/Top10Model");
const { Op } = require("sequelize");
const router = express();

//Busca todos os registros
router.get("/", async (req, res) => {
  try {
    const top = await Top10Model.findAll({
      attributes: [
        "BRICK",
        "SETOR_NEC_ABERTO",
        "EAN",
        "CEP_INICIAL",
        "CEP_FINAL",
        "PRODUTO",
        "LABORATORIO",
        "UNIDADES",
        "FCC",
        "RANK",
        "REPRESENTACAO",
      ],
    });
    res.status(200).json(top);
  } catch (error) {
    res.status(500).json({ message: `Erro de servidor ${error}` });
  }
});

//Busca os registros de um brick específico, cujo valor de rank está entre 1 e 10
router.get("/:brick", async (req, res) => {
  try {
    const { brick } = req.params;
    const topBrick = await Top10Model.findAll({
      attributes: [
        "BRICK",
        "SETOR_NEC_ABERTO",
        "EAN",
        "CEP_INICIAL",
        "CEP_FINAL",
        "PRODUTO",
        "LABORATORIO",
        "UNIDADES",
        "FCC",
        "RANK",
        "REPRESENTACAO",
      ],
      where: {
        BRICK: brick,
        RANK: {
          [Op.between]: [1, 10],
        },
      },
    });
    res.status(200).json(topBrick);
  } catch (error) {
    res.status(500).json({ message: `Erro de servidor ${error}` });
  }
});

// Busca os registros de um CEP informado
router.get("/cep/:user_cep", async (req, res) => {
  try {
    const { user_cep } = req.params;
    const cepAsInteger = parseInt(user_cep, 10);

    if (isNaN(cepAsInteger)) {
      return res.status(400).json({
        message: "CEP inválido. Certifique-se de que o CEP é um número válido.",
      });
    }

    const topBrick = await Top10Model.findAll({
      attributes: [
        "BRICK",
        "SETOR_NEC_ABERTO",
        "EAN",
        "CEP_INICIAL",
        "CEP_FINAL",
        "PRODUTO",
        "LABORATORIO",
        "UNIDADES",
        "FCC",
        "RANK",
        "REPRESENTACAO",
      ],
      where: {
        CEP_INICIAL: {
          [Op.lte]: cepAsInteger,
        },
        CEP_FINAL: {
          [Op.gte]: cepAsInteger,
        },
      },
      order: [["SETOR_NEC_ABERTO", "ASC"]],
    });

    res.status(200).json(topBrick);
  } catch (error) {
    res.status(500).json({ message: `Erro de servidor ${error}` });
  }
});

module.exports = router;
