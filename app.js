const express = require('express'),
    app = express()

//Inicializacion de la aplicacion
app.set('port', process.env.PORT || 3000)

//Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//Rutas
app.use(require('./rutas/router'))
app.use(require('./rutas/api'))

app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en ' , app.get('port'))
})