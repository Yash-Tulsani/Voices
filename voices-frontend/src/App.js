import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route, RouterProvider} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Banner from './components/Banner/Banner';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import AnimatedBg from './components/AnimatedBg/AnimatedBg';
import Login from './pages/Login/Login';
import Rooms from './pages/Rooms/Rooms';
import GuestRoute from './components/ProtectedRoutes/GuestRoute';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';


function App() {
  return (

    <BrowserRouter>
      <AnimatedBg style={{zIndex:0}}/>
      <Navigation/>
      <Routes>
        <Route element={<GuestRoute/>}>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Route>

        <Route element={<ProtectedRoutes/>}>
          <Route exact path="/rooms" element={<Rooms/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
