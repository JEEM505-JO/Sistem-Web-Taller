const carroceria_controller = require('../controllers/carroceria_controller')

const express = require('express'),
    router = express.Router(),
    pool = require('../database'),
    model = require('../models/model'),
    vehiculoController = require('../controllers/controller'),
    modeloController = require('../controllers/modelo_controller'),
    clienteController = require('../controllers/cliente_controller')

//VEHICULO
const VEHICULO_TABLE = 'vehiculo', ID_VEHICULO = 'Placa'

//obtener Todos los vehiculos
router.get('/vehiculo', vehiculoController.getVehiculo)

//Obtener uno de los Vehiculos
router.get('/api/vehiculo/:id', async(req, res)=>{
    const id = req.params.id

    const row = await pool.query(
        model.getOneElement(VEHICULO_TABLE, ID_VEHICULO, id)
    )
    if(row) res.status(200).send(row)

    res.status(404)
})

//Insertar un vehiculo 
router.post('/vehiculo', vehiculoController.guardarVehiculo)

//Eliminar un vehiculo
router.delete('/vehiculo/:id', vehiculoController.deleteVehiculo)


//MODELO 

router.get('/modelo', modeloController.getModelo)

router.post('/modelo', modeloController.guardarModelo)

router.delete('/modelo/:id', modeloController.deleteModelo)


//Carroceria

router.get('/carroceria', carroceria_controller.getcarroceria)


//Cliente

router.get('/cliente', clienteController.getCliente)

router.post('/cliente', clienteController.guardarCliente)

module.exports = router

