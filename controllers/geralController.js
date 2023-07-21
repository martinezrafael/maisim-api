const express = require("express");
const GeralModel = require("../models/GeralModel");
const { Op } = require("sequelize");
const router = express();

//Busca todos os registros
router.get("/", async (req, res) => {
  try {
    const topGeral = await GeralModel.findAll({
      attributes: {
        exclude: ["id"],
      },
    });
    res.status(200).json(topGeral);
  } catch (error) {
    res.status(500).json({ message: `Erro de servidor ${error}` });
  }
});

router.get("/cep/:user_cep", async (req, res) => {
  try {
    const { user_cep } = req.params;

    console.log(user_cep);

    const cepAsInteger = parseInt(user_cep, 10);
    console.log("chega aqui");
    console.log(cepAsInteger);

    if (isNaN(cepAsInteger)) {
      return res.status(400).json({
        message: "CEP inválido. Certifique-se de que o CEP é um número válido.",
      });
    }

    const topBrick = await GeralModel.findAll({
      attributes: {
        exclude: ["id"],
      },
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
