const PoolCluster = require('mysql/lib/PoolCluster')
const pool = require('../database')

const mecanicoController = {

  getRows : async (req, res) => {
    const selectRows = await pool.query('SELECT * FROM mecanico WHERE JefeTaller IS NOT NULL')
    const selectEspecialidad = await pool.query('SELECT CodEspecialidad FROM mecanico GROUP BY CodEspecialidad')
    const selectJefes = await pool.query('SELECT IDMecanico as id, CONCAT(Nombre, " ",Apellido) as Nombre FROM mecanico WHERE Estado = 1')
    const maxId = await pool.query('SELECT (MAX(IDMecanico)+1) AS maxId FROM mecanico')
    const selectJefe = await pool.query('SELECT * FROM mecanico WHERE JefeTaller IS NULL')
    
    if(selectRows.length > 0){
      res.render('layouts/mecanico.hbs', {
        title: 'Taller Hno Flores | Empleados',
        rows : selectRows,
        especialidades : selectEspecialidad,
        empleados: selectJefes,
        maxId: maxId[0].maxId,
        jefe: selectJefe
      })
    }
  },

  guardarMecanico: async (req, res) =>{
    const {IDMecanico, Nombre, Apellido, Estado, CodEspecialidad, JefeTaller } = req.body 

    const findOneMecanico = await pool.query("SELECT * FROM mecanico WHERE IDMecanico=?", IDMecanico);

    if(findOneMecanico.length > 0){
      let updateMecanico = {
        Nombre, Apellido, Estado, CodEspecialidad, JefeTaller 
      }
      await pool.query("UPDATE mecanico SET ? WHERE IDMecanico = ?",[updateMecanico, IDMecanico], (err, result)=>{
        if(err){
          res.status(500).send(err)
        }else if(result){
          res.status(202).redirect('/mecanico')
        }
      })
    }
    else{
      let newMecanico = {
        IDMecanico, Nombre, Apellido, Estado, CodEspecialidad, JefeTaller
      }
      await pool.query('INSERT INTO mecanico SET ?', newMecanico, (err, result) =>{
        if(err){
          res.status(500).send(err)
        }else if(result){
          res.status(201).redirect('/mecanico')
        }
      })
    }
  },

  deleteMecanico: async (req, res,next) =>{ 
    const id = req.params.id

    await pool.query('DELETE FROM mecanico WHERE IDMecanico = ?', id,async(err, result)=>{
      if(err){
        console.log(err)
        if(err.code === "ER_ROW_IS_REFERENCED_2" && err.sqlMessage.includes('asignacionorden') ){
          const asignacionorden = await pool.query("SELECT IDMecanico, IdOrdAsignada FROM asignacionorden WHERE IDMecanico = ?", id)
          res.send({
            message: 'error',
            alert: true,
            alertTitle : 'Error',
            alertMessage : `No se ha podido eliminar ha este mecanico debido a que hay una orden de la cual esta encargado: La orden Asignada es ${asignacionorden[0].IdOrdAsignada} encargado: ${asignacionorden[0].IDMecanico}`,
            icon : 'error',
            showConfirmButton: true,
            timer: 1500
          }).end()
          next()
        }
      }else if(result){
        console.log(result)
        res.send({
          message: 'ok',
          alert: true,
          alertTitle : 'Ok',
          alertMessage : `Se ha borrado con exito`,
          icon : 'success',
          showConfirmButton: true,
          timer: 2500
        }).end()
      }
    })
  }
}

module.exports = mecanicoController