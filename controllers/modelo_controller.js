const pool = require("../database.js");

const modelo_controller = {
  getModelo: async (req, res, next) => {
    const rows = await pool.query(
      "SELECT mo.IDModelo, mo.NombreModelo, ma.IDMarca, ma.NombreMarca FROM modelo AS mo INNER JOIN marca AS ma ON mo.IDMarca = ma.IDMarca WHERE mo.Estado = 1"
    );
    const marca = await pool.query("SELECT * FROM marca");

    const Idmarca = await pool.query('SELECT (MAX(IDMarca)+1) AS Idmarca FROM marca')

    const maxId = await pool.query('SELECT (MAX(IDModelo) + 1) AS maxId FROM modelo ')

    if (rows) {
      res
        .status(200)
        .render("layouts/modelo.hbs", {
          title: "Vehiculo | Modelo",
          registros: rows,
          maxId,
          marca,
          Idmarca
        });
    } else {
      res.status(404);
      next("error");
    }
  },
  guardarModelo: async (req, res, next) => {
    const values = req.body;
    const modelo = await pool.query(
      "SELECT * FROM modelo WHERE IDModelo = ?",
      values.IDModelo
    );

    if (modelo.length > 0) {
      const result = await pool.query("UPDATE modelo SET NombreModelo = ? WHERE IDModelo = ?", [
        values.NombreModelo, values.IDModelo
      ]);
      
      if (result) 
         res.status(202).redirect("/modelo");
      else {
        res.send("Error not modified");
        next();
      }
    } 
    
    else {
      
      let newModel = {
        IDModelo : values.IDModelo,
        NombreModelo : values.NombreModelo,
        IDMarca : values.IDMarca,
        NombreMarca : values.marca
      }

      console.log(newModel)
      const marca = await pool.query('SELECT * FROM marca WHERE IDMarca = ?', newModel.IDMarca)

      if(marca.length > 0){
        const result = await pool.query(
          'INSERT INTO modelo (IDModelo, NombreModelo, IDMarca) VALUES(?,?,?)', 
          [newModel.IDModelo, newModel.NombreModelo, newModel.IDMarca])
          if (result) res.status(201).redirect("/modelo");
          else {
            res.send("Not Inserted", result.ErrorPacket);
            next();
          }
      }else{
        const result = await pool.query("call SP_INSERTAR_MODEL_MARCA (?,?,?,?)",
         [newModel.IDMarca, newModel.NombreMarca, newModel.IDModelo, newModel.NombreModelo]);
         if (result) 
          res.status(201).redirect("/modelo");
         else {
          res.send("Not Inserted", result.ErrorPacket);
          next();
        }
      }
    }
  },
  deleteModelo: async (req, res) => {
    const id = req.params.id;
    const getModelo = await pool.query(
      "SELECT * FROM modelo WHERE IDModelo = ?",
      id
    );

    if(getModelo.length > 0){
      const dropModelo = await pool.query(
        "UPDATE modelo SET Estado = 0 WHERE IDModelo = ?",
        id
      )
      console.log(dropModelo)
      res.redirect('/modelo')
      
    }
  }
}

module.exports = modelo_controller;
