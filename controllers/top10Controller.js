const express = require("express");
const Top10Model = require("../models/Top10Model");
const { Op } = require("sequelize");
const router = express();

// Função para buscar os registros com base no CEP e no filtro de RANK
const getTopBrickByCep = async (req, res, rankFilter) => {
  try {
    const { user_cep } = req.params;

    const cepAsInteger = parseInt(user_cep, 10);

    if (isNaN(cepAsInteger)) {
      return res.status(400).json({
        message: "CEP inválido. Certifique-se de que o CEP é um número válido.",
      });
    }

    const topBrick = await Top10Model.findAll({
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
        RANK: rankFilter,
      },
      order: [["SETOR_NEC_ABERTO", "ASC"]],
    });

    res.status(200).json(topBrick);
  } catch (error) {
    res.status(500).json({ message: `Erro de servidor ${error}` });
  }
};

// Busca todos os registros
router.get("/", async (req, res) => {
  try {
    const top = await Top10Model.findAll({
      attributes: {
        exclude: ["id"],
      },
    });
    res.status(200).json(top);
  } catch (error) {
    res.status(500).json({ message: `Erro de servidor ${error}` });
  }
});

// Busca os registros de um brick específico, cujo valor de rank está entre 1 e 10
router.get("/rank/:brick", async (req, res) => {
  try {
    const { brick } = req.params;
    const topBrick = await Top10Model.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        brick: brick,
        rank: {
          [Op.between]: [1, 10],
        },
      },
    });
    res.status(200).json(topBrick);
  } catch (error) {
    res.status(500).json({ message: `Erro de servidor ${error}` });
  }
});

// Busca os registros com base no CEP e no filtro de RANK entre 1 e 10
router.get("/cep/rank/:user_cep", async (req, res) => {
  getTopBrickByCep(req, res, {
    [Op.between]: [1, 10],
  });
});

// Busca os registros com base no CEP
router.get("/cep/:user_cep", async (req, res) => {
  getTopBrickByCep(req, res);
});

module.exports = router;
