import Home from "./pages/Home";
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoomPage from "./room/RoomPage";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/room/:roomID" element={<RoomPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
