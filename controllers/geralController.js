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

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10; // Defina o tamanho padrão da página (quantidade de registros por página)

    // Calcula o offset (pula registros) e o limite (quantidade máxima de registros) a serem usados na consulta
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const { count, rows } = await GeralModel.findAndCountAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        CEP_INICIAL: {
          [Op.gte]: cepAsInteger,
        },
        CEP_FINAL: {
          [Op.lte]: cepAsInteger,
        },
      },
      order: [["SETOR_NEC_ABERTO", "ASC"]],
      offset,
      limit,
    });

    res.status(200).json({
      total: count, // Total de registros encontrados
      totalPages: Math.ceil(count / pageSize), // Total de páginas
      currentPage: page, // Página atual
      pageSize: limit, // Tamanho da página (quantidade de registros por página)
      data: rows, // Registros da página atual
    });
  } catch (error) {
    res.status(500).json({ message: `Erro de servidor ${error}` });
  }
});

module.exports = router;
