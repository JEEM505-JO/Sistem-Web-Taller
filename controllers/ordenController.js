const { restart } = require('nodemon')
const pool = require('../database')
const ordenController = {
  getRows : async (req, res) => {
    const selectOrdenRows = await pool.query('SELECT o.CodOrden, o.CodCheckIN, o.IDMecanico, DATE_FORMAT(o.FechaInicio, "%Y-%m-%d %r") AS FechaInicio, DATE_FORMAT(o.FechaFin, "%Y-%m-%d %r") AS FechaFin, asig.IdOrdAsignada FROM orden AS o INNER JOIN asignacionorden AS asig ON asig.CodOrden = o.CodOrden WHERE Estado = 1')
    const selectAsing = await pool.query('SELECT * FROM asignacionorden WHERE EstadoOrden = 1')
    const mecanicos = await pool.query('SELECT IDMecanico, CONCAT(Nombre, " ", Apellido) AS Mecanico FROM mecanico Where Estado = 1')
    const checkins = await pool.query('SELECT CodCheckIN, DATE_FORMAT(FechaIngreso, "%Y-%m-%d %r") AS FechaIngreso FROM checkin WHERE Estado = 1 ORDER BY FechaIngreso DESC')
    
    if(selectOrdenRows.length > 0){
      res.render('layouts/orden.hbs', {
        title: 'Taller Hno Flores | Orden',
        rows : selectOrdenRows,
        rowsAsign : selectAsing,
        mecanicos,
        checkins
    })
    }else{
      res.render('layouts/orden.hbs', {
        title: 'Taller Hno Flores | Orden'})
    }
    
  },

  guardarOrdenes : async (req, res) => { 
    const {id,idasign, checkin, mecanico, FechaIngreso, FechaSalida} = req.body

    if(id){
      const searchRow = await pool.query('SELECT * FROM orden WHERE CodOrden = ?', id)

      if(searchRow.length > 0){
        let updateOrden = {
          CodCheckIN: checkin,
          IDMecanico: mecanico,
          FechaInicio: formatDate(FechaIngreso),
          FechaFin: formatDate(FechaSalida)
        }

        await pool.query('UPDATE orden SET ? WHERE CodOrden = ?', [updateOrden, id], async(err, result)=>{
          if(err){
            res.status(500).send('Ocurrio un error al tratar de actualizar')
          }else if(result){
            await pool.query('UPDATE asignacionorden SET CodOrden = ?, IDMecanico = ? WHERE IdOrdAsignada = ?', 
            [id,updateOrden.IDMecanico, idasign], (err, result)=> {
              if(err) res.status(500).send(err); else if(result) res.status(203).redirect('/orden')
            })
          }
        })
      }else{
        res.status(502).send("Forbidden")
      }
    }else{      
      let newOrden = {
        CodCheckIN: checkin,
        IDMecanico: mecanico,
        FechaInicio: formatDate(FechaIngreso),
        FechaFin: formatDate(FechaSalida)
      }
  
      await pool.query('INSERT INTO orden SET ?', newOrden,
       async(err, result)=>{
        if(err){
          res.status(500).send('Ocurrio un error al insertar')
        }else if(result){
  
          await pool.query('INSERT INTO asignacionorden (CodOrden,IDMecanico) VALUES(?,?)', [result.insertId,newOrden.IDMecanico], (err, result)=> {
            if(err){
              res.status(500).send('Ocurrio un error grave')
            }
            else{
              res.status(202).redirect('/orden')
            }
          })
        } 
      })
    }
   },

   deleteOrden : async (req, res) => {  
    const id = req.params.id

    const selectOrdAsig = await pool.query('SELECT IdOrdAsignada AS idasig FROM asignacionorden WHERE CodOrden = ?', id)

    await pool.query('UPDATE orden SET Estado = 0 WHERE CodOrden = ?', id, async(err, result)=>{
      if(err){
        res.status(500).send(err)
      }else if(result){

        await pool.query("UPDATE asignacionorden SET EstadoOrden = 0 WHERE IdOrdAsignada = ?", selectOrdAsig[0].idasig, (err, result)=> {
          if(err){
            res.status(500).send(err)
          }else if(result){
            res.status(203).redirect('/orden')
          }
        })
      }
    })
   }
}

function formatDate (dateToFormat) {
  let fecha = [dateToFormat.split(' ')[0].split('/'), dateToFormat.split(' ')[1], dateToFormat.split(' ')[2]]
  fecha = [[`${fecha[0][2]}-${fecha[0][0]}-${fecha[0][1]}`], fecha[1], fecha[2]].join(' ')
  return fecha
}

module.exports = ordenController