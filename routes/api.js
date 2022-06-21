const carroceria_controller = require('../controllers/carroceria_controller')
const colorController = require('../controllers/color_controller')
const checkinController = require('../controllers/checkinController')
const mecanicoController = require('../controllers/mecanicoController')
const productoController = require('../controllers/productoController')
const serviceController = require('../controllers/servicioController')
const express = require('express'),
    router = express.Router(),
    pool = require('../database'),
    model = require('../models/model'),
    vehiculoController = require('../controllers/controller'),
    modeloController = require('../controllers/modelo_controller'),
    clienteController = require('../controllers/cliente_controller'),
    orden = require('../controllers/ordenController')

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

router.post('/carroceria', carroceria_controller.guardarcarroceria)

router.delete('/carroceria/:id', carroceria_controller.deletecarroceria)

//Color

router.get('/color', colorController.getColor)

router.post('/color', colorController.guardarColor)

router.delete('/color/:id', colorController.deleteColor)
//Cliente

router.get('/cliente', clienteController.getCliente)

router.post('/cliente', clienteController.guardarCliente)

router.delete('/cliente/:id', clienteController.deleteCliente)


//checkIn

router.get('/checkin', checkinController.getRows)

router.post('/checkin', checkinController.guardarCheckin)

router.delete('/checkin/:id', checkinController.deleteCheckin)

//Ordenes

router.get('/orden', orden.getRows)

router.post('/orden', orden.guardarOrdenes)

router.delete('/orden/:id', orden.deleteOrden)

//Mecanico 

router.get('/mecanico', mecanicoController.getRows)

router.post('/mecanico', mecanicoController.guardarMecanico)

router.delete('/mecanico/:id', mecanicoController.deleteMecanico)


//Productos

router.get("/producto", productoController.getProducts)

router.post('/producto', productoController.guardarProducto)

router.delete('/producto/:id', productoController.deleteProducto)

//Servicios

router.get('/servicio', serviceController.getRows)

router.post('/servicio', serviceController.guardarServicio)

module.exports = router

