import { getConnection } from "../db/context.js"
import mssql from 'mssql'
const postProducts = async (nombre, precio, stock, descripcion) => {
  try {
    const connection = await getConnection()

    const newProduct = await connection.request()
      .input('nombre', mssql.VarChar, nombre)
      .input('precio', mssql.Money, precio)
      .input('stock', mssql.Int, stock)
      .input('descripcion', mssql.VarChar, descripcion)
      .query(
        `INSERT INTO Productos(nombre, precio, stock, descripcion)
          VALUES(@nombre, @precio, @stock, @descripcion);`
      )

      return newProduct
  } catch (error) {
    console.log(error)
    return null
  }
}

export { postProducts }
