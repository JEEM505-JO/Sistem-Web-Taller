const express = require('express'),
    router = express.Router(),
    pool = require('../database'),
    model = require('../models/model'),
    controller = require('../controllers/controller')

//Vehiculo
const VEHICULO_TABLE = 'vehiculo', ID_VEHICULO = 'Placa'

//obtener Todos los vehiculos
router.get('/vehiculo', controller.getVehiculo)


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
router.post('/vehiculo', controller.insertVehiculo)

//Eliminar un vehiculo
router.delete('/vehiculo/:id', controller.deleteVehiculo)

router.put('/vehiculo/:id', controller.updateVehiculo)

module.exports = router