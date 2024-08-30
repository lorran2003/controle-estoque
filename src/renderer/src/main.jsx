import './assets/main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Home } from './page/Home'
import { CreateProduct } from './page/CreateProduct'
import { createHashRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Product } from './page/Product'
import { Login } from './components/Login'
import { EditProduct } from './components/EditProduct'
import { MenageProducts } from './page/MenageProducts'

const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/menage-products" element={<MenageProducts />} />
      <Route path="/home/products" element={<Product />} />
      <Route path="/home/products/create-product" element={<CreateProduct />} />
      <Route path="/home/products/edit-product" element={<EditProduct />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
