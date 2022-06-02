const pool = require('../database')

const clienteController = {
  
  getCliente : async (req, res, next) => {
    const maxId = await pool.query("SELECT (MAX(IdCliente)+1) AS maxId FROM cliente")
    const clientes = await pool.query('SELECT * FROM cliente')
    
    if(clientes.length > 0){
      res.render('layouts/cliente.hbs', 
      { clientes,
        id: maxId[0].maxId, 
        condicion: true})
    }
    else if(clientes.length === 0){
      res.render('layouts/cliente', { cadena: "No se han encontrado clientes", condicion: false })
    }
    else{
      next()
    }
  },

  guardarCliente : async (req, res, next) => {


    const newCliente = {
      IdCliente: req.body.IdCliente,
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Telefono: req.body.Telefono
    }

    const result = await pool.query(`
    INSERT INTO cliente (IdCliente, Nombre, Apellido, Telefono)
     VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE Nombre='${newCliente.Nombre}',
      Apellido='${newCliente.Apellido}', Telefono=${newCliente.Telefono}`, 
     [newCliente.IdCliente, newCliente.Nombre, newCliente.Apellido, newCliente.Telefono])

    if(result){
      res.redirect('/cliente')
    }
  }

}

module.exports = clienteController