const pool = require('../database')
const checkinController = {
  getRows : async (req, res) => {
    const getRow = await pool.query(`SELECT * FROM VW_GET_CHECKIN`)

    const getMecanico = await pool.query(`SELECT IDMecanico, CONCAT(Nombre,' ', Apellido) AS Mecanico FROM mecanico`)

    const getVehiculo = await pool.query('SELECT Placa FROM vehiculo')

    const getSintoma = await pool.query('SELECT CodSintoma, SintomaPresente FROM sintoma')

    getRow.map(row => {
      row.FechaIngreso = (row.FechaIngreso.split(' ')[0].split('/').join('-') +' ' + row.FechaIngreso.split(' ')[1] +' '+row.FechaIngreso.split(' ')[2])
    })

    if(getRow.length > 0){
      res.render('layouts/checkin.hbs',
       {
        title: 'Taller Hno Flores | CheckIn',
        rows: getRow,
        placas: getVehiculo,
        mecanicos: getMecanico,  
        sintoma: getSintoma
      })
    }else{
      res.render('layouts/checkin.hbs',
      {
        title: 'Taller Hno Flores | Checkin',
        empty: true,
        rows: 'No hay registros'
      })
    }
  },

  guardarCheckin : async (req, res) => {
    const id = req.body.id
    const { Observacion, Placa, mecanico, FechaIngreso, Sintoma } = req.body

    if(id){
      const getThis = await pool.query('SELECT * FROM checkin WHERE CodCheckIN = ?', id)

      if(getThis.length > 0){
        let updateCheckIn = {
          CodCheckIn: id,
          Observacion,
          Placa,
          FechaIngreso,
          IDMecanico: mecanico,
          CodSintoma: Sintoma
        }

        if(FechaIngreso.includes('/')){
          let day = updateCheckIn.FechaIngreso.split(' ')[0].split('/')[1],
          month = updateCheckIn.FechaIngreso.split(' ')[0].split('/')[0],
          year = updateCheckIn.FechaIngreso.split(' ')[0].split('/')[2]
  
          let hour = updateCheckIn.FechaIngreso.split(' ')[1]
  
          let newDate = `${year}-${month}-${day} ${hour}`
  
          updateCheckIn.FechaIngreso = newDate
        }

        console.log(updateCheckIn)
        await pool.query('UPDATE checkin SET ? WHERE CodCheckIN = ?', [updateCheckIn, id], (err, result)=>{
          if(err){
            console.log(err)
            res.status(500).send('Ocurrio un error al actualizar')
          }else if(result){
            console.log(result)
            res.status(203).redirect('/checkin')
          }
        })
      }
    }else{

      let newCheckin = {
        Observacion,
        Placa,
        FechaIngreso,
        IDMecanico: mecanico,
        CodSintoma: Sintoma
      }
      
      let day = newCheckin.FechaIngreso.split(' ')[0].split('/')[1],
      month = newCheckin.FechaIngreso.split(' ')[0].split('/')[0],
      year = newCheckin.FechaIngreso.split(' ')[0].split('/')[2]

      let hour = newCheckin.FechaIngreso.split(' ')[1]

      let newDate = `${year}-${month}-${day} ${hour}`

      newCheckin.FechaIngreso = newDate

      console.log(newCheckin)
      await pool.query('INSERT INTO checkin SET ?', newCheckin ,
      (err, result) => {
        if(result){
          console.log(result)
          res.status(201).redirect('/checkin')
        }else if(err){
          res.status(500).send('Ha ocurrido un error del servidor')
        }
      })
    }
    

  },

  deleteCheckin : async (req, res)=>{
    const id = req.params.id

    console.log(id)
    await pool.query('UPDATE checkin SET Estado = 0 WHERE CodCheckIN = ?', id, (err, result)=>{
      if(err){
        res.status(500).send('A ocurrido un error al tratar de eliminar el registro', err)
      }
      else{
        res.status(202).redirect('/checkin')
      }
    })
  }
}

module.exports = checkinController