const res = require('express/lib/response')

const express = require('express'),
    router = express.Router(),
    path = require('path')

    router.get('/', (req, res) =>{
        res.render('layouts/inicio.hbs', { title: 'Taller Hno Flores | Inicio', orders: 150, serv: 40, clientes: 13, Repuestos: 45 })
        // res.sendFile(path.join(__dirname,'../views/index.html'))
    })

    router.get('/checkin', (req, res)=>{
        res.render('layouts/checkin.hbs', {title: 'Taller Hno Flores | Chekc In'})
    })

    router.get('/cliente', ( req, res )=>{
        res.render('layouts/cliente.hbs', { title: 'Taller Hno Flores | Cliente'} ) 
    })

    router.get('/vehiculo', (req, res)=>{
        res.render('layouts/vehiculo.hbs', { title: 'Taller Hno Flores | Vehiculo'})
    })

    router.get('/modelo',( req, res )=>{
      res.render('layouts/modelo.hbs', {title: 'Taller Hno Flores | Modelo'})
    })

    router.get('/carroceria', (req,res)=>{
        res.render('layouts/carroceria.hbs', {title: 'Taller Hno Flores | Carroceria'})
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