const express = require('express'),
    router = express.Router(),
    pool = require('../database')

//Vehiculo

//obtener Todos los vehiculos
router.get('/api/vehiculo', async (req, res) => {
    const rows = await pool.query(
        'SELECT * FROM vehiculo')
    res.send(rows)
})

//Obtener uno de los Vehiculos
router.get('/vehiculo/:id', async(req, res)=>{
    const id = req.params.id

    console.log(id)
    const row = await pool.query(
        'SELECT * FROM vehiculo WHERE Placa = ?', [id]
    )
    res.send(row)
})

//Insertar un vehiculo 
router.post('/vehiculo', async(req, res)=>{
    const vehiculo = req.body

    const result = await pool.query(
        'INSERT INTO vehiculo SET ?', [vehiculo]
    )
    if(result){
        res.send(result)
    }
    else{
        res.send('Fallo al insertar')
    }
})



//Eliminar un vehiculo
router.delete('/vehiculo/:id', async(req, res)=>{
    const result = await pool.query('DELETE FROM vehiculo WHERE Placa = ?',req.params.id)
    if(result)
     res.send('Elemento eliminado')
    else{
        res.send('Error al eliminar')
    }
})

async function InsertarOActualizar(id){

} 

module.exports = router