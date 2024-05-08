import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from './components/Pages/Login/Login.jsx';
import Layout from './components/Layout/Layout.jsx';
import Home from './components/Pages/Home/Home.jsx';
import CustomerManagement from './components/CustomerManagement/CustomerManagement.jsx';
import AddProduct from './components/AddProducts/AddProducts.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
    path: '/Login',
    element:<Login/>
  },
  {
    path: '/Home',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/Home/CustomerManagement',
        element: <CustomerManagement />,
      },
      {
        path: '/Home/AddProducts',
        element: <AddProduct />,
      },
       
    ],
  },

  
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
