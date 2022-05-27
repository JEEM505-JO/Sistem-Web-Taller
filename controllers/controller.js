const async = require('hbs/lib/async')
const pool = require('../database'),
  model = require('../models/model')

const vehiculo_controller = {
  getVehiculo : async (req, res, next)=>{
    const rows = await pool.query("SELECT v.Placa, v.IdCliente, v.IDModelo, v.CodigoColor, v.TipoCarroceria, v.Año, cl.Nombre FROM `vehiculo` AS v INNER JOIN carroceria AS c ON v.TipoCarroceria = c.TipoCarroceria INNER JOIN clasevehiculo AS cl ON c.IDClase = cl.IDClase;")

    const cliente = await pool.query("SELECT * FROM cliente") 
    const TipoCarroceria = await pool.query("SELECT * FROM carroceria")
    const Modelo = await pool.query("SELECT * FROM modelo")
    const color = await pool.query("SELECT * FROM color ")

      if (rows){ res.status(200).render('layouts/vehiculo' , { registers: rows, cliente, TipoCarroceria, Modelo, color }) } else next(err)
  },

  insertVehiculo: async(req, res, next)=>{
    const values = req.body;
    const result = pool.query('INSERT INTO vehiculo SET ?', [values])
    if( result) 
      res.status(201).redirect('/vehiculo')

    else{
      res.send('Not Inserted', result.ErrorPacket)
      next()
    }
  },

  deleteVehiculo:  async(req, res)=>{
    const result = await pool.query('DELETE FROM vehiculo WHERE Placa = ?',req.params.id)
    if(result)
     res.redirect('/vehiculo')
    else{
        res.send('Error al eliminar')
    }
}

}

module.exports = vehiculo_controller