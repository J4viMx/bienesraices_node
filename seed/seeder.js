import categorias from "./categorias.js";
import precios from "./precios.js";
import usuarios from "./usuarios.js";
import db from "../config/db.js";
import { Precio, Categoria, Usuario } from "../models/index.js";

const importarDatos = async () => {
  try {
    //Autenticar
    await db.authenticate();

    //Generar las columnas
    await db.sync();

    //Insertar datos
    await Promise.all([
      Precio.bulkCreate(precios),
      Categoria.bulkCreate(categorias),
      Usuario.bulkCreate(usuarios),
    ]);

    console.log("Datos importados correctamente");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const eliminarDatos = async () => {
  try {
    await Promise.all([
      Precio.destroy({ where: {}, truncate: true }),
      Categoria.destroy({ where: {}, truncate: true }),
    ]);
    console.log("Datos eliminados correctamente");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importarDatos();
}

if (process.argv[2] === "-e") {
  eliminarDatos();
}
