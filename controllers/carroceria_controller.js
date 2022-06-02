const pool = require("../database.js");

const carroceria_controller = {
  getcarroceria: async (req, res, next) => {
    const rows = await pool.query(
      `SELECT ca.TipoCarroceria, ca.Nombre, ca.IDClase, cl.Clase
      FROM carroceria AS ca
      INNER JOIN clasevehiculo AS cl ON 
      ca.IDClase = cl.IDClase`
    );
    const clasevehiculo = await pool.query("SELECT * FROM clasevehiculo");

    if (rows) {
      res
        .status(200)
        .render("layouts/carroceria.hbs", {
          title: "Vehiculo | carroceria",
          registros: rows,
          clasevehiculo,
        });
    } else {
      res.status(404);
      next("error");
    }
  },
  guardarcarroceria: async (req, res, next) => {
    const values = req.body;
    const carroceria = await pool.query(
      "SELECT * FROM carroceria WHERE TipoCarroceria = ?",
      values.TipoCarroceria
    );

    if (carroceria.length > 0) {
      const result = await pool.query("UPDATE carroceria SET Nombre = ? WHERE TipoCarroceria = ?", [
        values.Nombrecarroceria, values.TipoCarroceria
      ]);
      
      if (result) 
         res.status(202).redirect("/carroceria");
      else {
        res.send("Error not modified");
        next();
      }
    } 
    
    else {
      let newModel = {
        TipoCarroceria : values.TipoCarroceria,
        Nombrecarroceria : values.Nombrecarroceria,

      }

      const marca = await pool.query('SELECT * FROM marca WHERE IDMarca = ?', newModel.IDMarca)

      if(marca.length > 0){
        const result = await pool.query(
          'INSERT INTO carroceria (TipoCarroceria, Nombrecarroceria, IDMarca) VALUES(?,?,?)', 
          [newModel.TipoCarroceria, newModel.Nombrecarroceria, newModel.IDMarca])
          if (result) res.status(201).redirect("/carroceria");
          else {
            res.send("Not Inserted", result.ErrorPacket);
            next();
          }
      }else{
        const result = await pool.query("call SP_INSERTAR_MODEL_MARCA (?,?,?,?)",
         [newModel.IDMarca, newModel.NombreMarca, newModel.TipoCarroceria, newModel.Nombrecarroceria]);
         if (result) 
          res.status(201).redirect("/carroceria");
         else {
          res.send("Not Inserted", result.ErrorPacket);
          next();
        }
      }
    }
  },
  deletecarroceria: async (req, res) => {
    const id = req.params.id;
    const getcarroceria = await pool.query(
      "SELECT * FROM carroceria WHERE TipoCarroceria = ?",
      id
    );

    if(getcarroceria.length > 0){
      const dropcarroceria = await pool.query(
        "UPDATE carroceria SET Estado = 0 WHERE TipoCarroceria = ?",
        id
      )
      console.log(dropcarroceria)
      res.redirect('/carroceria')
      
    }
  }
}

module.exports = carroceria_controller;
