import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from './store/store.js'
import {Provider} from 'react-redux'
import AllBlogs from './pages/AllBlogs'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import MyBlogs from './pages/MyBlogs.jsx'
import Protected from './components/Protected.jsx'

const ProtectedRoute = ({element, authentication}) => {
  return (<Protected authentication={authentication}>{element}</Protected>)
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/all-blogs' element={<AllBlogs />} />

      {/* public routes */}
      <Route path='/login' element={<ProtectedRoute element={<Login />} authentication={false} />} />
      <Route path='/signup' element={<ProtectedRoute element={<SignUp />} authentication={false} />} />
      <Route path='/my-blogs' element={<MyBlogs />} />

      {/* Private routes */}
      <Route path='/my-blogs' element={<ProtectedRoute element={<MyBlogs />} authentication={true} />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
