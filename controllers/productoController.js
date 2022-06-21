const pool = require('../database'),
  productoController = {
    getProducts: async (req, res) =>{
      const selectProduct = await pool.query('SELECT * FROM producto WHERE Estado = 1')
      const selectCategorias = await pool.query('SELECT * FROM categoriaproducto')
      const maxId = await pool.query('SELECT (MAX(CodProducto)+1) AS Id FROM producto')

      res.render('layouts/producto.hbs', 
      {
        title: 'Taller Hno Flores | Productos',
        rows: selectProduct,
        categorias : selectCategorias,
        id: maxId[0].Id
      })
    },

    guardarProducto: async (req, res)=>{
      const {CodProducto, PrecioUnidad, NombreProducto, categoria, Stock} = req.body

      const exist = await pool.query('SELECT * FROM producto WHERE CodProducto = ?', CodProducto)

      if(exist.length > 0){
        let updateProducto = {
           PrecioUnidad, NombreProducto, IDCategoria: categoria, Stock
        }

        await pool.query('UPDATE producto SET ? WHERE CodProducto = ?', [updateProducto,CodProducto], (err,result)=>{
          if(err){
            res.status(500).send({
              message: "error", details: err
            })
          }else if(result){
            res.status(202).redirect('/producto')
          }
        })
      }else{
        
      let newProducto = {
        CodProducto, PrecioUnidad, NombreProducto, IDCategoria: categoria, Stock
      }

      await pool.query('INSERT INTO producto SET ?', newProducto, (err, result)=>{
        if(err){
          res.status(500).send({
             message: "error", details: err
          })
        }else if(result){
          res.status(201).redirect('/producto')
        }
      })
      }
    },

    deleteProducto : async (req, res)=>{

    }
  }

  module.exports = productoController