const express = require('express'),
    path = require('path'),
    morgan = require('morgan')
    app = express()

//Inicializacion de la aplicacion
app.set('port', process.env.PORT || 3000)

const publicDir = `${__dirname}/public`

//Directorio Estatico 
app.use(express.static(publicDir))
app.use(morgan('dev'))
//View Engine 
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'./views'))

//Modulo handlebar para el view engine
hbs = require('hbs').registerPartials(__dirname+"/views/partials",function(e){});

//Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Rutas
app.use(require('./routes/router'))
app.use(require('./routes/api'))

//App en escucha
app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en ' , app.get('port'))
})