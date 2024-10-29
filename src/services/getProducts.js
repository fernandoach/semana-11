import { getConnection } from "../db/context.js"

const getProducts = async () => {
  try {
    const connection = await getConnection()
    const queryResult = await connection.request().query(
      'SELECT * FROM Productos;'
    )
    return queryResult.recordset
  } catch (error) {
    console.log(error)
    return null
  }
}

export { getProducts }