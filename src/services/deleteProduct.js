import { getConnection } from "../db/context.js"
import mssql from 'mssql'
const deleteProduct = async (id) => {
  try {
    const connection = await getConnection()
    const queryResult = await connection
      .request()
      .input('id', mssql.Int, id)
      .query(
        `
          DELETE FROM Productos
          WHERE id = @id;
        `
      )
    return queryResult
  } catch (error) {
    console.log(error)
    return error
  }
}

export {deleteProduct}