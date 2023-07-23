const express = require("express");
const GeralModel = require("../models/GeralModel");
const { Op } = require("sequelize");
const router = express();

// Defina o tamanho padrão da página (quantidade de registros por página)
const defaultPageSize = 10;

// Busca todos os registros
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
    const cepAsInteger = parseInt(user_cep, 10);

    if (isNaN(cepAsInteger)) {
      return res.status(400).json({
        message: "CEP inválido. Certifique-se de que o CEP é um número válido.",
      });
    }

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;

    // Verifica se a página atual não excede o número total de páginas
    const totalRows = await GeralModel.count({
      where: {
        CEP_INICIAL: {
          [Op.gte]: cepAsInteger,
        },
        CEP_FINAL: {
          [Op.lte]: cepAsInteger,
        },
      },
    });

    const totalPages = Math.ceil(totalRows / pageSize);
    if (page > totalPages) {
      return res.status(400).json({
        message: `Página inválida. O número máximo de páginas é ${totalPages}.`,
      });
    }

    // Calcula o offset (pula registros) e o limite (quantidade máxima de registros) a serem usados na consulta
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // Utilize a função findAndCountAll para buscar registros paginados
    const { count, rows } = await GeralModel.findAndCountAll({
      attributes: ["PRODUTO", "LABORATORIO"], // Inclua apenas os campos necessários
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
      totalPages, // Total de páginas
      currentPage: page, // Página atual
      pageSize: limit, // Tamanho da página (quantidade de registros por página)
      data: rows, // Registros da página atual
    });
  } catch (error) {
    res.status(500).json({ message: `Erro de servidor ${error}` });
  }
});

module.exports = router;
