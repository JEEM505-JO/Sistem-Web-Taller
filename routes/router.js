const express = require('express'),
    router = express.Router(),
    path = require('path')

    router.get('/', (req, res) =>{
        res.render('layouts/inicio.hbs', { title: 'Taller Hno Flores | Inicio', orders: 150, serv: 40, clientes: 13, Repuestos: 45 })
        // res.sendFile(path.join(__dirname,'../views/index.html'))
    })

    router.get('/checkin', (req, res)=>{
        res.render('layouts/checkin.hbs')
    })

    router.get('/cliente', ( req, res )=>{
        res.render('layouts/cliente.hbs', { title: 'Taller Hno Flores | Cliente'} ) 
    })

    router.get('/vehiculo', (req, res)=>{
        res.render('layouts/vehiculo.hbs', { title: 'Taller Hno Flores | Vehiculo'})
    })

    router.get('/vehiculo/modelo',( req, res )=>{
        res.sendFile(path.join(__dirname,'../views/modelo.html'))
    })

    router.get('/vehiculo/carroceria', (req,res)=>{
        res.sendFile(path.join(__dirname,'../views/carroceria.html'))
    })

    router.get('/vehiculo/color', (req,res)=>{
        res.sendFile(path.join(__dirname, '../views/color.html'))
    })

    router.get('/vehiculo/motor', (req, res)=>{
        res.sendFile(path.join(__dirname, '../views/motor.html'))
    })
module.exports = router