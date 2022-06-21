const pool = require('../database'),
  serviceController = {
    getRows : async(req, res)=>{ 
      const selectRows = await pool.query('SELECT * FROM servicio')
      const selectCategories = await pool.query('SELECT * FROM categoriaservicio')
      const maxId = await pool.query('SELECT (MAX(IdServicio)+1) AS id FROM servicio')
   
      res.render('layouts/servicio.hbs', {
        title: 'Taller Hno Flores | Servicios',
        rows: selectRows,
        categories: selectCategories,
        id: maxId[0].id
      })
    },

    guardarServicio : async (req, res)=>{
      const {IdServicio, DescripServicio, Tarifa, CodCategoria} = req.body

      const exist = await pool.query('SELECT * FROM servicio WHERE IdServicio = ?', IdServicio)

      if(exist.length > 0){
        let updateService = {
          DescripServicio, Tarifa, CodCategoria
        }
        
          await pool.query('UPDATE servicio SET ? WHERE IdServicio', [updateService, IdServicio], (err, result)=>{
            if(err){
              res.status(500).send({
                message: "error", details: err
              })
            }else if(result){
              res.status(203).redirect('/servicio')
            }
          })
      }else{
        let newService = {
          IdServicio, DescripServicio, Tarifa, CodCategoria
        }

        await pool.query('INSERT INTO servicio SET ?', newService, (err, result)=>{
          if(err){
            res.status(500).send({
              message: "error", details: err
            })
          }else if(result){
            res.status(201).redirect('/servicio')
          }
        })
      }
    },
     
    deleteServicio : async (req, res)=> {
      console.log(req.body)

      const id = req.params.id

      
    }
  }

  module.exports = serviceController