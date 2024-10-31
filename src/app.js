import express, { response } from 'express'
import { getProducts } from './services/getProducts.js'
import { postProducts } from './services/postProducts.js'
import { getConnection } from './db/context.js'
import { putProducts } from './services/putProducts.js'
import { deleteProduct } from './services/deleteProduct.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { getProductById } from './services/getProductById.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views', join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    const queryResult = await getProducts()
    return res.render('index.ejs', { data: queryResult })
  } catch (error) {
    console.log(error)
  }
})

app.get('/register', (req, res)=>{
  return res.render('register.ejs')
})
app.post('/register', async (req, res) => {
  try {
    const {nombre, precio, stock, descripcion} = req.body
    console.log(req.query)
    const queryResult = await postProducts(nombre, precio, stock, descripcion)
    return res.redirect('/')
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

app.get('/edit/:id', async (req, res)=> {
  const id = Number(req.params.id)
  const product = await getProductById(id)
console.log(product)
  return res.render('edit.ejs', { product })
})

app.post('/edit/:id', async (req, res) => {
  try {
    const connection = await getConnection()

    const id = Number(req.params.id)
    const { nombre, precio, stock, descripcion } = req.body 
    const queryResult = await putProducts(id, nombre, precio, stock, descripcion)

    return res.redirect('/')
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

app.post('/delete/:id', async (request, response)=>{ 
  try {
    const id = Number(request.params.id)

    const queryResult = await deleteProduct(id)

    return response.redirect('/')

  } catch (error) {
    return response.json(error)
  }
})

app.listen(3000, () => {
  console.log('Servidor en: http://localhost:3000')
})