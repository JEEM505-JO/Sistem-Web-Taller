const express = require('express'),
    path = require('path'),
    app = express()

//Inicializacion de la aplicacion
app.set('port', process.env.PORT || 3000)

const publicDir = `${__dirname}/public`

//Directorio Estatico 
app.use(express.static(publicDir))

//View Engine 
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'./views'))

//Modulo handlebar para el view engine
const handlebars = require('express-handlebars').create({
    defaultLayout : 'main', //layout por defecto
    layoutsDir : path.join(app.get('views'), 'layouts'), //directorio layouts
    partialsDir : path.join(app.get('views'), 'partials'), //directorio partials
    extname : 'hbs' //Nombre de extensión
})
app.engine('hbs',handlebars.engine)

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