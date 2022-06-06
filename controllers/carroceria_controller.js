const pool = require("../database.js");

const carroceria_controller = {
  getcarroceria: async (req, res, next) => {
    const rows = await pool.query(
      `SELECT ca.TipoCarroceria, ca.Nombre, ca.IDClase, cl.Clase
      FROM carroceria AS ca
      INNER JOIN clasevehiculo AS cl ON 
      ca.IDClase = cl.IDClase WHERE ca.Estado = 1`
    );
    const clasevehiculo = await pool.query("SELECT * FROM clasevehiculo");

    const maxId = await pool.query("SELECT (MAX(IDClase)+1) as maxId FROM clasevehiculo")

    const maxTipoCarroceria = await pool.query('SELECT (MAX(TipoCarroceria)+1) AS idTipoCarroceria FROM carroceria')

    if (rows) {
      res
        .status(200)
        .render("layouts/carroceria.hbs", {
          title: "Vehiculo | carroceria",
          registros: rows,
          clasevehiculo,
          idClase: maxId[0].maxId,
          idTipoCarroceria : maxTipoCarroceria[0].idTipoCarroceria
        });
    } else {
      res.status(404);
      next("error");
    }
  },
  guardarcarroceria: async (req, res, next) => {
     const { TipoCarroceria, Nombre, IDClase, Clase } = req.body;

      const result = await pool.query("CALL SP_GUARDAR_CARROCERIA_CLASE(?,?,?,?)", 
      [TipoCarroceria, Nombre, IDClase, Clase]);
      
      if (result) 
         res.status(202).redirect("/carroceria");
      else {
        res.send("Error not modified");
        next();
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
