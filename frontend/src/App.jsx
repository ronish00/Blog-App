import './App.css'
import Layout from './Layout'
import AllBlogs from './pages/AllBlogs'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Home />} />
      <Route path='/all-blogs' element={<AllBlogs />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
