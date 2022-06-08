const async = require('hbs/lib/async')
const pool = require('../database')

const colorController = {
  getColor: async (req, res)=>{
    const rows = await pool.query('SELECT * FROM color WHERE Estado = 1')

    if(rows.length >= 1){
      res.render('layouts/color.hbs', { 
        title: 'Taller Hno Flores | Color',
        rows
      })
    }
  },

  guardarColor : async (req, res)=>{

    const { NombreColor, foto,id, color} = req.body
    //Modificar
    if(id != null){
      const getColor = await pool.query("SELECT * FROM color WHERE CodigoColor = ?", id)

      if(getColor.length > 0){
        let updateColor = {
          NombreColor, CodHex:color
        }

        await pool.query("UPDATE color SET ? WHERE CodigoColor = ?",[updateColor, id], 
        (err, result)=>{
          if(err){
            res.status(500).json({
              message: "Ocurrio un error al actualizar"
            })
          }else{
            res.status(202).redirect('/color')
          }
        })
      }
    }
    //Insertar
    else{
      let newColor = {
        NombreColor,
        CodHex: color
      }
  
      await pool.query('INSERT INTO color SET ?', newColor, (err, result)=>{
        if(result.affectedRows){
          res.status(201).redirect('/color')
        }
        else if(err){
          return res.status(500).json({
            message: "Error del servidor al tratrar de insertar"
          })
        }
      })
    }
  },

  deleteColor : async (req, res) =>{
    const id = req.params.id
    console.log(id)
    await pool.query('UPDATE color SET Estado = 0 WHERE CodigoColor = ?', id, (err, result)=>{
      if(err){
        res.status(500).json({
          message: "Error del servidor al tratar de eliminar"
        })
      }else{
        res.status(202).redirect('/color')
      }
    })
  }
}



module.exports = colorController