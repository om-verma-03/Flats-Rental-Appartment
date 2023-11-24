import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import Layout from './components/Layout';
import SignIn from './Pages/SignIn'
import Rent from './Pages/Rent';
import './App.css';
import SignUp from './Pages/Signup';
import Forum from './Pages/Forum'
import PropertyDetail from './Pages/PropertyDetail';
import Publish from './Pages/Publish';
import Replies from './Pages/Replies'
import ReviewsPage  from './Pages/ReviewsPage';
import About from './Pages/About';
import Profile from './Pages/Profile';
// Create a new theme object



const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
    <Route index element={<Home />} />
    <Route path="rent" element={<Rent />} />
    <Route path="rent/:id" element={<PropertyDetail/>}/>
    <Route path="publish" element={<Publish />} />
    <Route path="forum" element={<Forum />} />
    <Route path='/:id/replies' element={<Replies/>}/>
    <Route path="about" element={<About />} />
    <Route path="login" element={<SignIn />} />
    <Route path='signup' element={<SignUp/>}/>
    <Route path='reviewPage' element={<ReviewsPage/>}/>
    <Route path='profile' element={<Profile/>}/>
  </Route>
))



function App() {
  
  return (
    <div>
      <RouterProvider router={router} />  
    

      <ToastContainer />

    </div>
  );
}

export default App;
