const express = require('express'),
    router = express.Router(),
    pool = require('../database.js')

    router.get('/', async(req, res) =>{
        const NumeroCliente = await pool.query("SELECT * FROM cliente_total"),
            NumeroOrdenes = await pool.query('SELECT * FROM VW_COUNT_ORDENES'),
            NumeroProductos = await pool.query('SELECT * FROM total_produc_tienda'),
            NumeroServicios = await pool.query('SELECT * FROM VW_COUNT_SERVICIOS')
        
        res.render('layouts/inicio.hbs', {
            title: 'Taller Hno Flores | Inicio',
            NumeroOrdenes:NumeroOrdenes[0]['Total de Ordenes'], 
            NumeroServicios:NumeroServicios[0]['Numero de Servicios'], 
            NumeroCliente:NumeroCliente[0].ClientesRegistrados,
            NumeroProductos:NumeroProductos[0]['Total Productos'] 
        })
    })

   // router.get('/checkin', (req, res)=> res.render('layouts/checkin.hbs'))

    router.get('/orden', (req, res)=> {
        res.render('layouts/orden.hbs', { title: 'Taller Hno Flores | Ordenes'})
    })

    router.get('/mecanico', (req, res)=>{
        res.render('layouts/mecanico.hbs', {title: 'Taller Hno Flores | Empleados'})
    })

    router.get('/falla', (req, res)=> {
        res.render('layouts/falla.hbs', { title: 'Taller Hno Flores | Fallas'})

    })

    router.get('/producto', (req, res)=> {
        res.render('layouts/producto.hbs', { title: 'Taller Hno Flores | Producto'})
    }) 

    router.get('/servicio',( req, res ) =>{ 
        res.render( 'layouts/servicio.hbs', { title: 'Taller Hno Flores | Servicio'})
    })

    
module.exports = router