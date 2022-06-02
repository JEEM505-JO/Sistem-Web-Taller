
const express = require('express'),
    router = express.Router(),
    pool = require('../database.js')

    router.get('/', async(req, res) =>{
        const NumeroCliente = await pool.query("SELECT COUNT(*) AS NumeroCliente FROM cliente"),
            NumeroOrdenes = await pool.query('SELECT COUNT(*) AS TotalOrdenes FROM Orden'),
            NumeroProductos = await pool.query('SELECT COUNT(*) AS TotalProductos FROM producto WHERE Estado = 1')
        res.render('layouts/inicio.hbs', { title: 'Taller Hno Flores | Inicio', NumeroOrdenes, serv: 40, NumeroCliente, NumeroProductos })
    })

    router.get('/checkin', (req, res)=>{
        res.render('layouts/checkin.hbs', {title: 'Taller Hno Flores | Chekc In'})
    })

    router.get('/color', (req,res)=>{
        res.render('layouts/color.hbs', {title: 'Taller Hno Flores | Color'})
    })

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