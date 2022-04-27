const express = require('express'),
    router = express.Router(),
    path = require('path')

    router.get('/vehiculo', (req, res) =>{
        res.sendFile(path.join(__dirname,'../views/index.html'))
    })

module.exports = router