import { getConnection } from "../db/context.js"
import mssql from 'mssql'

const putProducts = async (id, nombre, precio, stock, descripcion) => {
  try {
    const connection = await getConnection()

    const productUpdated = await connection.request()
      .input('nombre', mssql.VarChar, nombre)
      .input('precio', mssql.Money, precio)
      .input('stock', mssql.Int, stock)
      .input('descripcion', mssql.VarChar, descripcion)
      .input('id', mssql.Int, id)
      .query(
        `UPDATE Productos
        SET nombre=@nombre, precio=@precio, stock=@stock, descripcion=@descripcion
        WHERE id=@id`
      )
    return productUpdated;

  } catch (error) {
    console.log(error)
    return null
  }
}

export { putProducts }