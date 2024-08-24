import './assets/main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Home } from './page/Home';
import { CreateProduct } from './components/CreateProduct';
import {
  createHashRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import { Product } from './page/Product';
import { Login } from './components/Login';

const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path='/' element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/products" element={<Product />} />
      <Route path="/home/products/create-product" element={<CreateProduct />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
