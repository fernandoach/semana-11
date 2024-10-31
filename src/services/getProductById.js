import { getConnection } from "../db/context.js"
import mssql from 'mssql'

const getProductById = async (id) => {
  try {
    const connection = await getConnection()
    const queryResult = await connection
      .request()
      .input('id', mssql.Int, id)
      .query(
        ` 
          SELECT * FROM Productos
          WHERE id=@id;
        `
      )
      return queryResult.recordset
  } catch (error) {
    console.log(error)
    return error
  }
}

export { getProductById }
