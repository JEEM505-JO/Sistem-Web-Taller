const pool = require('../database')

const colorController = {
  getColor: async (req, res)=>{
    const rows = await pool.query('SELECT * FROM color WHERE Estado = 1')

    if(rows.length >= 1){
      res.render('layouts/color.hbs', { 
        title: 'Taller Hno Flores | Color',
        rows
      })
    }
  }
}

module.exports = colorController