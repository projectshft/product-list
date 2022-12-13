import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
// import App from './App'
import Home from './pages/home'
import NewProduct from './pages/NewProduct'
import './index.css'
import { store } from './store'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import FormSuccess from './pages/FormSuccess'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />}></Route>
      <Route path="/new-product" >
        <Route index element={<NewProduct />} />
        <Route path="/new-product/success" element={<FormSuccess />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} >
      </RouterProvider>
    </Provider>
  </React.StrictMode>
)
