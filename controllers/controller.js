const pool = require('../database')

const vehiculo_controller = {
  getVehiculo : async (req, res, next)=>{
    const rows = await pool.query(
      "SELECT CONCAT(C.Nombre , ' ' , C.Apellido) AS NombreCompleto,  C.IdCliente AS IdCliente, M.IDModelo, Co.CodigoColor, Ca.TipoCarroceria, CV.Clase,   C.Telefono AS Contacto, Placa, Ma.NombreMarca AS Marca, M.NombreModelo AS Modelo, V.Combustible AS Combustible, V.Año AS Anio, Ca.Nombre AS Carroceria, CV.Clase AS ClaseVehiculo, Co.NombreColor AS ColorBase, CONCAT(V.Kilometraje,' km') As DistanciaRecorrida FROM Vehiculo AS V INNER JOIN Cliente AS C ON V.IdCliente = C.IdCliente INNER JOIN Modelo AS M ON V.IDModelo = M.IDModelo INNER JOIN Marca AS Ma ON M.IDMarca = Ma.IDMarca INNER JOIN Carroceria AS Ca ON V.TipoCarroceria = Ca.TipoCarroceria INNER JOIN ClaseVehiculo AS CV ON Ca.IDClase = CV.IDClase INNER JOIN Color AS Co ON V.CodigoColor = Co.CodigoColor WHERE V.Estado = 1")

    const cliente = await pool.query("SELECT * FROM cliente WHERE Estado = 1") 
    const TipoCarroceria = await pool.query("SELECT * FROM carroceria")
    const Modelo = await pool.query("SELECT * FROM modelo")
    const color = await pool.query("SELECT * FROM color ")

      if (rows){ res.status(200).render('layouts/vehiculo' , { registers: rows, cliente, TipoCarroceria, Modelo, color }) } else next(err)
  },

    guardarVehiculo: async(req, res, next)=>{
      const values = req.body;
      console.log(values)
      const vehiculo = await pool.query('SELECT * FROM vehiculo WHERE Placa = ?', values.Placa)
      console.log(vehiculo)

      if(vehiculo.length > 0){
        const result = await pool.query('UPDATE vehiculo SET ? WHERE Placa = ?', [values, values.Placa])
         if(result) res.status(202).redirect('/vehiculo'); else res.send('Error not modified'); next()
      }else{
        const result = pool.query('INSERT INTO vehiculo SET ?', [values])
        if( result) 
          res.status(201).redirect('/vehiculo')
        else{
          res.send('Not Inserted', result.ErrorPacket)
          next()
        }
      }
  },

  deleteVehiculo:  async(req, res)=>{
    const result = await pool.query('UPDATE vehiculo SET Estado = 0 WHERE Placa = ?',req.params.id)
    console.log(result.changedRows)
    res.redirect('/vehiculo') 
  }
}

module.exports = vehiculo_controller