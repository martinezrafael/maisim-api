const express = require("express");
const Top10Model = require("../models/Top10Model");
const { Op } = require("sequelize");
const router = express();
const xlsx = require("xlsx");

//Busca todos os registros
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

//Busca os registros de um brick específico, cujo valor de rank está entre 1 e 10
router.get("/:brick", async (req, res) => {
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

router.get("/cep/rank/:user_cep", async (req, res) => {
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
        RANK: {
          [Op.between]: [1, 10],
        },
      },
      order: [["SETOR_NEC_ABERTO", "ASC"]],
    });

    res.status(200).json(topBrick);
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
      },
      order: [["SETOR_NEC_ABERTO", "ASC"]],
    });

    res.status(200).json(topBrick);
  } catch (error) {
    res.status(500).json({ message: `Erro de servidor ${error}` });
  }
});

router.post("/comparar-dados", async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }

    // Extrair o arquivo enviado pelo frontend
    const uploadedFile = req.files.file;
    const workbook = xlsx.read(uploadedFile.data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const dataFromSheet = xlsx.utils.sheet_to_json(sheet);

    // Obtém os dados da tabela anterior (assumindo que você já tem uma rota para isso)
    const dataFromTable = await Top10Model.findAll({
      attributes: ["PRODUTO", "LABORATORIO", "UNIDADES"],
    });

    // Lista para armazenar os itens encontrados na tabela
    const itensEncontrados = [];

    // Função para comparar os itens da planilha com os itens da tabela
    dataFromSheet.forEach((itemSheet) => {
      const { Nome, Laboratório, Quantidade } = itemSheet;
      const itemEncontrado = dataFromTable.find((itemTable) => {
        return (
          itemTable.PRODUTO === Nome &&
          itemTable.LABORATORIO === Laboratório &&
          itemTable.UNIDADES === Quantidade
        );
      });

      if (itemEncontrado) {
        itensEncontrados.push(itemEncontrado);
      }
    });

    res.status(200).json({ itensEncontrados });
  } catch (error) {
    console.error("Erro ao comparar os dados:", error);
    res.status(500).json({ message: "Erro ao comparar os dados" });
  }
});

module.exports = router;
