const express = require('express');
const Top10Model = require('../models/Top10Model');
const { Op } = require('sequelize');

const router = express();

//Busca todos os registros
router.get('/', async (req, res) => {
  try {
    const top = await Top10Model.findAll({
      attributes: {
        exclude: ['id']
      }
    });
    res.status(200).json(top);
  } catch (error) {
    res.status(500).json({message: `Erro de servidor ${error}`})
    
  }
})

//Busca os registros de um brick específico, cujo valor de rank está entre 1 e 10
router.get('/:brick', async(req, res) => {
  try {
    const { brick } = req.params;
    const topBrick = await Top10Model.findAll({
      attributes: {
        exclude: ['id']
      },
      where: {
        brick: brick,
        rank: {
          [Op.between]: [1,10]
        }
      }
    });
    res.status(200).json(topBrick);
  } catch (error) {
    res.status(500).json({message: `Erro de servidor ${error}`})
  }
})


//Busca os registros de um brick específico, cujo valor de rank está entre 1 e 10 e o setor_nec_aberto é GENERICO
router.get('/:brick/:setor_nec_aberto', async(req, res) => {
  try {
    const { brick, setor_nec_aberto } = req.params;
    const topBrick = await Top10Model.findAll({
      attributes: {
        exclude: ['id']
      },
      where: {
        brick: brick,
        setor_nec_aberto: setor_nec_aberto,
        rank: {
          [Op.between]: [1,10]
        }
      }
    });
    res.status(200).json(topBrick);
  } catch (error) {
    res.status(500).json({message: `Erro de servidor ${error}`})
  }
})



module.exports = router;