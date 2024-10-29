import express, { response } from 'express'
import { getProducts } from './services/getProducts.js'
import { postProducts } from './services/postProducts.js'
import { getConnection } from './db/context.js'
import { putProducts } from './services/putProducts.js'
import { deleteProduct } from './services/deleteProduct.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views', join(__dirname, 'views'))


app.get('/', async (req, res) => {
  try {
    const queryResult = await getProducts()
    return res.render('index.ejs', { data: queryResult })
  } catch (error) {
    console.log(error)
  }
})

app.post('/', async (req, res) => {
  try {
    const {nombre, precio, stock, descripcion} = req.body
    const queryResult = await postProducts(nombre, precio, stock, descripcion)
    return res.json(queryResult)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

app.put('/:id', async (req, res) => {
  try {
    const connection = await getConnection()

    const id = Number(req.params.id)
    const { nombre, precio, stock, descripcion } = req.body 
    const queryResult = await putProducts(id, nombre, precio, stock, descripcion)

    return res.json(queryResult)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

app.delete('/:id', async (request, response)=>{ 
  try {
    const id = Number(request.params.id)

    const queryResult = await deleteProduct(id)

    return response.json(queryResult)

  } catch (error) {
    return response.json(error)
  }
})

app.listen(3000, () => {
  console.log('Servidor en: http://localhost:3000')
})